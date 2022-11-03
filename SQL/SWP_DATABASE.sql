DROP DATABASE eJournal_DB
go
CREATE DATABASE eJournal_DB
go
USE eJournal_DB

--Tạo bảng Chính--
CREATE TABLE Account(
	AccountId int PRIMARY KEY not null IDENTITY(1,1),
	email VARCHAR (255) not null UNIQUE,
	[password] CHAR(60) not null,
	Phone Char(11) UNIQUE CHECK(Phone LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]' OR Phone LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
	firstName NVARCHAR (150) not null,
	lastName NVARCHAR(150) not null,
	Organization NVARCHAR(150) not null,
	DateOfBirth DATE,
	role varchar(10) not null,
	[status] varchar(10) not null,
	slug nvarchar(300) not null,
	[enable] bit DEFAULT '0'
)

go
CREATE TABLE Reviewer(
	ReviewerId int PRIMARY KEY not null,
	Invitable BIT not null,
)
go
CREATE TABLE Author(
	AuthorId int not null PRIMARY KEY,
	Introduction text not null,
	Education text not null,
	[Address] text,
)

go
CREATE TABLE Field(
	FieldId int not null PRIMARY KEY IDENTITY(1,1),
	FieldName NVARCHAR (100) not null UNIQUE
)
go
CREATE TABLE Paper(
	PaperId int not null PRIMARY KEY IDENTITY(1,1), 
	title NVARCHAR(225) not null,
	Abstract text not null,
	SubmitTime DATETIME not null,
	LinkPDF char(100) not null,
	NumberOfPage int not null,
  Grade int,
	[status] varchar(10) not null,
	JournalId int not null,
  authorID int not null,
)
go
CREATE TABLE Invitation(
	InvitationId int not null PRIMARY KEY IDENTITY(1,1),
	ReviewerId int not null,
	PaperId int not null,
	InviteDate DATE not null,
	[status] varchar(10) not null,
	CONSTRAINT UQ_Invitation UNIQUE(ReviewerId,PaperId)
)
go
CREATE TABLE Publish(
	PublishId int not null PRIMARY KEY IDENTITY(1,1),
	PaperId int not null,
	IssueId int not null,
	PublishDate Date not null,
	AccessLevel varchar(10) not null,
	CONSTRAINT UQ_Publish UNIQUE(PaperId,IssueId)
)
go 
CREATE TABLE Issue(
	IssueId int not null PRIMARY KEY IDENTITY(1,1),
	JournalId int not null,
	Volume int not null,
	Issue int not null,
	startDate DATE not null,
	endDate DATE not null,
	NumberOfPage int not null
	CONSTRAINT UQ_Issue UNIQUE(JournalId,IssueId,Volume)
)
go 
CREATE TABLE Journal(
	JournalId int not null PRIMARY KEY IDENTITY(1,1),
	[name] NVARCHAR (255) not null UNIQUE,
	Introduction text not null,
	Organization NVARCHAR(255) not null,
	ISSN char(8) not null UNIQUE,
	[status] varchar(10) not null,
  slug nvarchar(255) not null UNIQUE,
)
go 
CREATE TABLE Invoice(
	InvoiceId int not null PRIMARY KEY IDENTITY(1,1),
	AccountId int not null ,
	JournalId int not null ,
	PaymentMethod VARCHAR(50) not null,
	PaymentTime DATETIME not null,
	endDate DATE not null,
	amount BIGINT
	CONSTRAINT UQ_Invoice UNIQUE(AccountId,JournalId)
)
go
-- Kết thúc bảng chính--
-- Tạo Bảng nối--
CREATE TABLE ReviewerField(
	ReviewerId int not null,
	FieldId int not null ,
	PRIMARY KEY (ReviewerId , FieldId)
)
go
CREATE TABLE ReviewReport(
	ReviewReportID int not null PRIMARY KEY IDENTITY(1,1),
	PaperId int not null,
	ReviewerId int not null ,
	ReviewDate DATE,
	grade int CHECK(grade>=0 AND grade<=10),
	Confidentiality INT,
  Verdict varchar(10),
	Note text,
	[status] varchar(10) not null
	CONSTRAINT UQ_ReviewReport UNIQUE(PaperId,ReviewerId)
)
go
CREATE TABLE PaperField(
	PaperId int not null,
	FieldId int not null,
	PRIMARY KEY(PaperId,FieldId)
)
go 
CREATE TABLE Manager(
	JournalId int not null,
	AccountId int not null,
	PRIMARY KEY (JournalId,AccountId)
)
go 
CREATE TABLE JournalField(
	JournalId int not null,
	FieldId int not null,
	PRIMARY KEY (JournalId,FieldId)
)
-- kết thúc bảng nối--
-- Thêm Khóa Ngoại--

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

