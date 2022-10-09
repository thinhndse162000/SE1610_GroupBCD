account_sql = """INSERT INTO Account
  (email, password, phone, firstName, lastName, organization, DateOfBirth, role, status)
VALUES
  """ 

reviewer_sql = """INSERT INTO Reviewer
  (ReviewerId, Invitable)
VALUES
  """

author_sql = """INSERT INTO Author
  (AuthorId, Introduction, Education, Address)
VALUES
  """

field_sql = """INSERT INTO Field
  (FieldName)
VALUES
  """

journal_sql = """INSERT INTO Journal
  (name, Introduction, organization, issn, status)
VALUES
  """

journal_field_sql = """INSERT INTO JournalField
  (journalId, FieldId)
VALUES
  """

manager_account_sql = """INSERT INTO Account
  (email, password, phone, firstName, lastName, organization, DateOfBirth, role, status)
VALUES
  """ 

manager_reviewer_sql = """INSERT INTO Reviewer
  (ReviewerId, Invitable)
VALUES
  """

manager_author_sql = """INSERT INTO Author
  (AuthorId, Introduction, Education, Address)
VALUES
  """

manager_sql = """INSERT INTO Manager
  (journalId, accountId)
VALUES
  """

paper_sql = """INSERT INTO Paper
  (title, abstract, SubmitTime, LinkPDF, NumberOfPage, Grade, Status, JournalID, authorID)
VALUES
  """

invitation_sql = """INSERT INTO Invitation
  (ReviewerId, PaperId, InviteDate, status)
VALUES
  """

reviewerfield_sql = """INSERT INTO ReviewerField
  (ReviewerId, FieldId)
VALUES
  """

reviewreport_sql = """INSERT INTO ReviewReport
  (ReviewerId, PaperID, ReviewDate, grade, Confidentiality, verdict, Note, status)
VALUES
  """

issue_sql = """INSERT INTO Issue
  (JournalID, Volume, Issue, startDate, endDate, NumberOfPage)
VALUES
  """

publish_sql = """INSERT INTO Publish
  (PaperId, IssueId, PublishDate, AccessLevel)
VALUES
  """

paper_field_sql = """INSERT INTO PaperField
  (paperId, FieldId)
VALUES
  """

fields = "Physics,Chemistry,Math,Computer Science,Culture,Economics,Biologoy,History,Medical,Psychology,Sociology,Philosophy".strip().split(',')
