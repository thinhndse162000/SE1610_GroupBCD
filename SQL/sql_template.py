account_sql = """INSERT INTO Account
  (email, password, phone, firstName, lastName, organization, DateOfBirth, role, status, slug, [enable])
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
  (name, Introduction, organization, NumberOfRound, NumberOfReviewer, issn, status, slug, price)
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
  (title, abstract, SubmitTime, LinkPDF, NumberOfPage, [Round], Grade, Status, JournalID, authorID)
VALUES
  """

invitation_sql = """INSERT INTO Invitation
  (ReviewerId, PaperId, [Round], InviteDate, status)
VALUES
  """

reviewerfield_sql = """INSERT INTO ReviewerField
  (ReviewerId, FieldId)
VALUES
  """

reviewreport_sql = """INSERT INTO ReviewReport
  (ReviewerId, PaperID, [Round], ReviewDate, grade, Confidentiality, verdict, Note, status)
VALUES
  """

issue_sql = """INSERT INTO Issue
  (JournalID, Volume, Issue, Year, startDate, endDate, NumberOfPage)
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
