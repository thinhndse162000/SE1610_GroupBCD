USE eJournal_DB

-- DELETE ALL FK
declare @sql nvarchar(max) = (
    select 
        'alter table ' + quotename(schema_name(schema_id)) + '.' +
        quotename(object_name(parent_object_id)) +
        ' drop constraint '+quotename(name) + ';'
    from sys.foreign_keys
    for xml path('')
);
exec sp_executesql @sql;

-- TRUNCATE ALL TABLE
DECLARE @SqlCmd NVARCHAR(MAX)

DECLARE C1 CURSOR FOR
    SELECT N'TRUNCATE TABLE ' + QUOTENAME(s.name) + '.' + QUOTENAME(t.name) + ';'
    FROM sys.tables t
    INNER JOIN sys.schemas s ON s.schema_id = t.schema_id
    WHERE t.[name] <> 'sysdiagrams' 
        AND t.is_ms_shipped = 0

OPEN C1

FETCH NEXT FROM C1 INTO @SqlCmd

WHILE @@FETCH_STATUS = 0
BEGIN
    PRINT @SqlCmd
    EXEC sp_executesql @SqlCmd

    FETCH NEXT FROM C1 INTO @SqlCmd
END

CLOSE C1
DEALLOCATE C1

-- ADD FK CONSTRAINT
ALTER TABLE Reviewer
ADD FOREIGN KEY (ReviewerId) REFERENCES Account(AccountId);
ALTER TABLE Author
ADD FOREIGN KEY (AuthorId) REFERENCES Account(AccountID);
ALTER TABLE ReviewerField
ADD FOREIGN KEY (ReviewerId) REFERENCES Reviewer(ReviewerId);
ALTER TABLE ReviewerField
ADD FOREIGN KEY (FieldId) REFERENCES Field(FieldId);
ALTER TABLE Invitation
ADD FOREIGN KEY (ReviewerId) REFERENCES Reviewer(ReviewerId);
ALTER TABLE Invitation
ADD FOREIGN KEY (PaperId) REFERENCES Paper(PaperId);
ALTER TABLE ReviewReport
ADD FOREIGN KEY (PaperId) REFERENCES Paper(PaperId);
ALTER TABLE ReviewReport
ADD FOREIGN KEY (ReviewerId) REFERENCES Reviewer(ReviewerId);
ALTER TABLE PaperField
ADD FOREIGN KEY (PaperId) REFERENCES Paper(PaperId);
ALTER TABLE PaperField
ADD FOREIGN KEY (FieldId) REFERENCES Field(FieldId);
ALTER TABLE Publish
ADD FOREIGN KEY (PaperId) REFERENCES Paper(PaperId);
ALTER TABLE Publish
ADD FOREIGN KEY (IssueId) REFERENCES Issue(IssueId);
ALTER TABLE Issue
ADD FOREIGN KEY (JournalId) REFERENCES Journal(JournalId);
ALTER TABLE Invoice
ADD FOREIGN KEY (AccountId) REFERENCES Account(AccountId);
ALTER TABLE Invoice
ADD FOREIGN KEY (JournalId) REFERENCES Journal(JournalId);
ALTER TABLE Manager
ADD FOREIGN KEY (AccountId) REFERENCES Account(AccountId);
ALTER TABLE Manager
ADD FOREIGN KEY (JournalId) REFERENCES Journal(JournalId);
ALTER TABLE Paper
ADD FOREIGN KEY (JournalId) REFERENCES Journal(JournalId);
ALTER TABLE Paper
ADD FOREIGN KEY (AuthorID) REFERENCES Author(AuthorID);
ALTER TABLE JournalField
ADD FOREIGN KEY (JournalId) REFERENCES Journal(JournalId);
ALTER TABLE JournalField
ADD FOREIGN KEY (FieldId) REFERENCES Field(FieldId);

