from sql_template import *
import bcrypt
import names
import random
from lorem_text import lorem

field_num = 12
account_num = 50
journal_num = len(fields) * 2
paper_num = 50 * 25
journal_field = {}

journal_accepted_paper = {}

paper_field = {}

accepted_paper_id = []
accepted_reviewer_paper_id = {}

rejected_paper_id = []
rejected_reviewer_paper_id = {}

pending_paper_id = []
pending_reviewer_paper_id = {}

reviewing_paper_id = []
reviewing_reviewer_paper_id = {}

paper_status = ["PENDING", "REVIEWING", "ACCEPTED", "REJECTED"]
reviewer_field = {}

class SqlTemplate:
    def __init__(self, header):
        self.header = header
        self.items = []

    def insert(self, item):
        self.items.append(item)

    def build(self):
        sql_text = ""
        for i in range(0, len(self.items), 500):
            built_text = (",\n  ").join(self.items[i:i+500]) + ";"
            sql_text += self.header + built_text + "\n"
        return sql_text

class AuthorSql(SqlTemplate):
    def __init__(self):
        super().__init__(author_sql)
        self.id = 0

    def insert(self, full_name):
        self.id += 1
        super().insert(f"({self.id}, '{full_name}', 'FPT', '123 O day')")

class ReviewerSql(SqlTemplate):
    def __init__(self):
        super().__init__(reviewer_sql)
        self.id = 0
    
    def insert_account(self):
        self.id += 1
        super().insert(f"({self.id},1)")

    def insert_manager(self):
        self.id += 1
        super().insert(f"({self.id},0)")

class AccountSql(SqlTemplate):
    def __init__(self):
        super().__init__(account_sql)
        self.author = AuthorSql()
        self.reviewer = ReviewerSql()

        self.salt = bcrypt.gensalt()
        self.email_tmpl = "test{}@gmail.com"
        self.password_tmpl = "test{}"
        self.phone = 9812423212

        self.manager_email_tmpl = "manager{}@gmail.com"
        self.manager_password_tmpl = "manager{}"

    def hash_password(self, string):
        password = ""
        password = bcrypt.hashpw(str.encode(string), self.salt).decode()
        return password

    def insert_account(self):
        for i in range(account_num):
            email = self.email_tmpl.format(i)
            password = self.hash_password(self.password_tmpl.format(i))
            first_name = names.get_first_name()
            last_name = names.get_last_name()
            phone = self.phone
            self.phone += 1

            super().insert(f"('{email}', '{password}', '{phone}', '{first_name}', '{last_name}', 'FPT', '2001-01-01', 'MEMBER', 'OPEN')")
            self.author.insert(f"{first_name} {last_name}")
            self.reviewer.insert_account()

    def insert_manager(self):
        for i in range(journal_num):
            email = self.manager_email_tmpl.format(i)
            password = self.hash_password(self.manager_password_tmpl.format(i))
            first_name = names.get_first_name()
            last_name = names.get_last_name()
            phone = self.phone
            self.phone += 1

            super().insert(f"('{email}', '{password}', '{phone}', '{first_name}', '{last_name}', 'FPT', '2001-01-01', 'MANAGER', 'OPEN')")
            self.author.insert(f"{first_name} {last_name}")
            self.reviewer.insert_manager()

class FieldSql(SqlTemplate):
    def __init__(self):
        super().__init__(field_sql)
        for field_name in fields:
            super().insert(f"('{field_name}')")

class JournalFieldSql(SqlTemplate):
    def __init__(self):
        super().__init__(journal_field_sql)
    
    def insert(self, journal_id, field_id):
        journal_field[journal_id] = field_id

        super().insert(f"({journal_id}, {field_id})")

class ManagerSql(SqlTemplate):
    def __init__(self):
        super().__init__(manager_sql)

    def insert(self, journal_id, manager_id):
        super().insert(f"({journal_id}, {manager_id})")

class JournalSql(SqlTemplate):
    def __init__(self):
        super().__init__(journal_sql)
        self.journal_field = JournalFieldSql()
        self.manager = ManagerSql()

        self.journal_name_tmpl = ["{} And Life", "Hello {}"]
        self.issn = 1000

    def insert(self):
        for i, field_name in enumerate(fields):
            for j, name in enumerate(self.journal_name_tmpl):
                id = i * len(self.journal_name_tmpl) + j + 1

                self.issn += 1
                super().insert(f"('{name.format(field_name)}', 'This is {name.format(field_name)}', 'FPT', '123-{self.issn}', 'OPEN')")

                self.journal_field.insert(id, i+1)
                self.journal_field.insert(id, random.choice(list(range(1,i+1)) + list(range(i+2, len(fields)))))
                self.manager.insert(id, account_num + id)

class PaperFieldSql(SqlTemplate):
    def __init__(self):
        super().__init__(paper_field_sql)

    def insert(self, paper_id, field_id):
        if (paper_id not in paper_field):
            paper_field[paper_id] = set()
        if (field_id not in paper_field[paper_id]):
            super().insert(f"({paper_id}, {field_id})")
        paper_field[paper_id].add(field_id)

class PaperSql(SqlTemplate):
    def __init__(self):
        super().__init__(paper_sql)
        self.paper_field = PaperFieldSql()
        self.id = 0

    def insert_paper(self, author_id, journal_id, status):
        self.id += 1
        title = lorem.words(random.randint(10, 20))
        abstract = lorem.paragraphs(3)
        submit_time = "2022-05-15"
        link_pdf = f"{self.id}.pdf"
        number_of_page = 10
        grade = 'null'

        if (status == "PENDING"):
            pending_paper_id.append([author_id, self.id])
            grade = 'null'
        elif (status == "ACCEPTED"):
            grade = random.randint(8, 10)
            accepted_paper_id.append([author_id, self.id])
            if (journal_id not in journal_accepted_paper):
                journal_accepted_paper[journal_id] = []
            journal_accepted_paper[journal_id].append(self.id)
        elif (status == "REJECTED"):
            grade = random.randint(1, 6)
            rejected_paper_id.append([author_id, self.id])
        elif (status == "REVIEWING"):
            grade = 'null'
            reviewing_paper_id.append([author_id, self.id])

        super().insert(f"('{title}', '{abstract}', '{submit_time}', '{link_pdf}', '{number_of_page}', {grade}, '{status}', {journal_id}, {author_id})")

        # insert paper field
        self.paper_field.insert(self.id, journal_field[journal_id])
        random_field_id = journal_field[journal_id]
        for _ in range(random.randint(1, 2)):
            while (random_field_id == journal_field[journal_id]):
                random_field_id = random.randint(1, field_num)
            self.paper_field.insert(self.id, random_field_id)

    def insert(self):
        for author_id in range(1, account_num + 1):
            paper_status_list = ["PENDING", "REVIEWING", "ACCEPTED", "REJECTED"]
            for _ in range(16):
                if (7 < random.randint(1,10)):
                    paper_status_list.append(random.choice(paper_status))
                else:
                    paper_status_list.append("ACCEPTED")
            for status in paper_status_list:
                journal_id = random.randint(1, journal_num)
                self.insert_paper(author_id, journal_id, status)

class InvitationSql(SqlTemplate):
    def __init__(self):
        super().__init__(invitation_sql)

    def insert(self):
        for author_id, paper_id in accepted_paper_id:
            reviewer_id_list = list(range(1, account_num+1))
            random.shuffle(reviewer_id_list)
            i = 0
            while (i < 3):
                reviewer_id = reviewer_id_list.pop()
                if (reviewer_id != author_id):
                    super().insert(f"({reviewer_id}, {paper_id}, '2022-06-01', 'ACCEPTED')")
                    i += 1
                    if (reviewer_id not in accepted_reviewer_paper_id):
                        accepted_reviewer_paper_id[reviewer_id] = []
                    accepted_reviewer_paper_id[reviewer_id].append(paper_id)
                    if (reviewer_id not in reviewer_field):
                        reviewer_field[reviewer_id] = set()
                    reviewer_field[reviewer_id].update(paper_field[paper_id])

            for _ in range(random.randint(2, 5)):

                reviewer_id = reviewer_id_list.pop()
                if (reviewer_id != author_id):
                    random_status = "CANCEL"
                    if (random.randint(1, 5) == 1):
                        random_status = "REJECTED"
                    super().insert(f"({reviewer_id}, {paper_id}, '2022-06-01', '{random_status}')")

                    if (reviewer_id not in reviewer_field):
                        reviewer_field[reviewer_id] = set()
                    reviewer_field[reviewer_id].update(paper_field[paper_id])

        for author_id, paper_id in rejected_paper_id:
            reviewer_id_list = list(range(1, account_num+1))
            random.shuffle(reviewer_id_list)
            i = 0
            while (i < 3):
                reviewer_id = reviewer_id_list.pop()
                if (reviewer_id != author_id):
                    super().insert(f"({reviewer_id}, {paper_id}, '2022-06-01', 'ACCEPTED')")
                    i += 1
                    if (reviewer_id not in rejected_reviewer_paper_id):
                        rejected_reviewer_paper_id[reviewer_id] = []
                    rejected_reviewer_paper_id[reviewer_id].append(paper_id)

                    if (reviewer_id not in reviewer_field):
                        reviewer_field[reviewer_id] = set()
                    reviewer_field[reviewer_id].update(paper_field[paper_id])

            for _ in range(random.randint(2, 5)):
                reviewer_id = reviewer_id_list.pop()
                if (reviewer_id != author_id):
                    random_status = "CANCEL"
                    if (random.randint(1, 5) == 1):
                        random_status = "REJECTED"
                    super().insert(f"({reviewer_id}, {paper_id}, '2022-06-01', '{random_status}')")
                    if (reviewer_id not in reviewer_field):
                        reviewer_field[reviewer_id] = set()
                    reviewer_field[reviewer_id].update(paper_field[paper_id])

        for author_id, paper_id in pending_paper_id:
            reviewer_id_list = list(range(1, account_num+1))
            random.shuffle(reviewer_id_list)
            i = 0
            max_num = random.randint(1, 2)
            while (i < max_num):
                reviewer_id = reviewer_id_list.pop()
                if (reviewer_id != author_id):
                    super().insert(f"({reviewer_id}, {paper_id}, '2022-06-01', 'ACCEPTED')")
                    i += 1
                    if (reviewer_id not in pending_reviewer_paper_id):
                        pending_reviewer_paper_id[reviewer_id] = []
                    pending_reviewer_paper_id[reviewer_id].append(paper_id)
                    if (reviewer_id not in reviewer_field):
                        reviewer_field[reviewer_id] = set()
                    reviewer_field[reviewer_id].update(paper_field[paper_id])

            for _ in range(random.randint(2, 5)):
                reviewer_id = reviewer_id_list.pop()
                if (reviewer_id != author_id):
                    random_status = "PENDING"
                    if (random.randint(1, 5) == 1):
                        random_status = "REJECTED"
                    super().insert(f"({reviewer_id}, {paper_id}, '2022-06-01', '{random_status}')")
                    if (reviewer_id not in reviewer_field):
                        reviewer_field[reviewer_id] = set()
                    reviewer_field[reviewer_id].update(paper_field[paper_id])

        for author_id, paper_id in reviewing_paper_id:
            reviewer_id_list = list(range(1, account_num+1))
            random.shuffle(reviewer_id_list)
            i = 0
            while (i < 3):
                reviewer_id = reviewer_id_list.pop()
                if (reviewer_id != author_id):
                    super().insert(f"({reviewer_id}, {paper_id}, '2022-06-01', 'ACCEPTED')")
                    i += 1
                    if (reviewer_id not in reviewing_reviewer_paper_id):
                        reviewing_reviewer_paper_id[reviewer_id] = []
                    reviewing_reviewer_paper_id[reviewer_id].append(paper_id)
                    if (reviewer_id not in reviewer_field):
                        reviewer_field[reviewer_id] = set()
                    reviewer_field[reviewer_id].update(paper_field[paper_id])

            for _ in range(random.randint(2, 5)):

                reviewer_id = reviewer_id_list.pop()
                if (reviewer_id != author_id):
                    random_status = "CANCEL"
                    if (random.randint(1, 5) == 1):
                        random_status = "REJECTED"
                    super().insert(f"({reviewer_id}, {paper_id}, '2022-06-01', '{random_status}')")
                    if (reviewer_id not in reviewer_field):
                        reviewer_field[reviewer_id] = set()
                    reviewer_field[reviewer_id].update(paper_field[paper_id])
        
class ReviewerFieldSql(SqlTemplate):
    def __init__(self):
        super().__init__(reviewerfield_sql)

    def insert(self):
        for reviewer_id, field_ids in reviewer_field.items():
            for field_id in field_ids:
                super().insert(f"({reviewer_id}, {field_id})")

class ReviewReportSql(SqlTemplate):
    def __init__(self):
        super().__init__(reviewreport_sql)

    def insert(self):
        for reviewer_id, paper_id_list in accepted_reviewer_paper_id.items():
            for paper_id in paper_id_list:
                grade = random.randint(8, 10)
                confidentiality = random.randint(8, 10)
                note = lorem.paragraph()
                super().insert(f"({reviewer_id}, {paper_id}, '2022-06-04', '{grade}', '{confidentiality}', 'ACCEPTED', '{note}', 'DONE')")

        for reviewer_id, paper_id_list in rejected_reviewer_paper_id.items():
            for paper_id in paper_id_list:
                grade = random.randint(3, 6)
                confidentiality = random.randint(8, 10)
                note = lorem.paragraph()
                super().insert(f"({reviewer_id}, {paper_id}, '2022-06-04', '{grade}', '{confidentiality}', 'REJECTED', '{note}', 'DONE')")

        for reviewer_id, paper_id_list in pending_reviewer_paper_id.items():
            for paper_id in paper_id_list:
                super().insert(f"({reviewer_id}, {paper_id}, '2022-06-04', null, null, null, null, 'PENDING')")

        for reviewer_id, paper_id_list in reviewing_reviewer_paper_id.items():
            for paper_id in paper_id_list:
                if (1 == random.randint(1, 5)):
                    grade = random.randint(8, 10)
                    confidentiality = random.randint(8, 10)
                    note = lorem.paragraph()
                    super().insert(f"({reviewer_id}, {paper_id}, '2022-06-04', {grade}, {confidentiality}, 'ACCEPTED', '{note}', 'DONE')")
                else:
                    super().insert(f"({reviewer_id}, {paper_id}, '2022-06-04', null, null, null, null, 'PENDING')")

class PublishSql(SqlTemplate):
    def __init__(self):
        super().__init__(publish_sql)

    def insert(self, paper_id, issue_id):
        access = "OPEN"
        if (4 > random.randint(1, 10)):
            access = "PRIVATE"
        super().insert(f"({paper_id}, {issue_id}, '2022-06-10', '{access}')")

class IssueSql(SqlTemplate):
    def __init__(self):
        super().__init__(issue_sql)
        self.publish = PublishSql()
        self.id = 0

    def insert(self):
        date = [['2022-06-17', '2022-08-22'], ['2022-09-11', '2022-10-03']]
        for journal_id, paper_id_list in journal_accepted_paper.items():
            num_of_issue = len(paper_id_list) // 10
            random.shuffle(paper_id_list)

            if (num_of_issue > 1):
                num_of_issue = random.randint(1, min(2, num_of_issue))

                for i in range(num_of_issue):
                    self.id += 1
                    super().insert(f"({journal_id}, 1, {i+1}, '{date[i][0]}', '{date[i][1]}', {random.randint(80, 125)})")
                    num_of_paper = random.randint(7, 10)

                    for _ in range(num_of_paper):
                        self.publish.insert(paper_id_list.pop(), self.id)


# invoice
