DROP DATABASE eJournal_DB
go
CREATE DATABASE eJournal_DB
go
USE eJournal_DB

--Tạo bảng Chính--
CREATE TABLE Account(
	AccountId INT PRIMARY KEY not null IDENTITY(1,1),
	email VARCHAR (255) not null UNIQUE,
	[password] CHAR(60) not null,
	Phone Char(11) UNIQUE CHECK(Phone LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]' OR Phone LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
	firstName NVARCHAR (150) not null,
	lastName NVARCHAR(150) not null,
	Organization NVARCHAR(150) not null,
	DateOfBirth DATE,
	profileImage char(100) UNIQUE,
	roleId INT not null,
)
go
CREATE TABLE Reviewer(
	ReviewerId INT PRIMARY KEY not null IDENTITY(1,1),
	Invitable BIT not null,
	AccountId INT not null UNIQUE
)
go
CREATE TABLE Author(
	AuthorId INT not null PRIMARY KEY IDENTITY(1,1),
	AccountId INT not null UNIQUE,
	Introdution text not null,
	Education text not null,
	[Address] text,
	profileImage char(100) UNIQUE,
)
go
CREATE TABLE Field(
	FieldId INT not null PRIMARY KEY IDENTITY(1,1),
	FieldName NVARCHAR (100) not null UNIQUE
)
go
CREATE TABLE Paper(
	PaperId INT not null PRIMARY KEY IDENTITY(1,1), 
	title NVARCHAR (225) not null,
	Abstract text not null,
	SubmitTime DATETIME not null,
	LinkPDF char(100) not null,
	NumberOfPage INT not null,
	[status] INT not null,
	JournalId INT not null UNIQUE,
)
go
CREATE TABLE Invitation(
	InvationId INT not null PRIMARY KEY IDENTITY(1,1),
	ReviewerId INT not null ,
	PaperId INT not null ,
	InviteDate DATE not null,
	[status] bit 
	CONSTRAINT UQ_Invitation UNIQUE(ReviewerId,PaperId)
)
go
CREATE TABLE Publish(
	PublishId INT not null PRIMARY KEY IDENTITY(1,1),
	PaperId INT not null ,
	IssueId int not null ,
	PublishDate Date not null,
	AccessLevel bit not null
	CONSTRAINT UQ_Publish UNIQUE(PaperId,IssueId)
)
go 
CREATE TABLE Issue(
	IssueId INT not null PRIMARY KEY IDENTITY(1,1),
	JournalId INT not null,
	Volume int not null,
	Issue int not null,
	startDate DATE not null,
	endDate DATE not null,
	NumberOfPage int not null
	CONSTRAINT UQ_Issue UNIQUE(JournalId,IssueId,Volume)
)
go 
CREATE TABLE Journal(
	JournalId INT not null PRIMARY KEY IDENTITY(1,1),
	[name] NVARCHAR (255) not null,
	Introdution text not null,
	Organization NVARCHAR(255) not null,
	ISSN char(8) not null
)
go 
CREATE TABLE Invoice(
	InvoiceId INT not null PRIMARY KEY IDENTITY(1,1),
	AccountId INT not null ,
	JournalId INT not null ,
	PaymentMethod VARCHAR(50) not null,
	PaymentTime DATETIME not null,
	endDate DATE not null
	CONSTRAINT UQ_Invoice UNIQUE(AccountId,JournalId)
)
go
-- Kết thúc bảng chính--
-- Tạo Bảng nối--
CREATE TABLE ReviewerField(
	ReviewerId INT not null,
	FieldId INT not null ,
	PRIMARY KEY (ReviewerId , FieldId),
)
go
CREATE TABLE AuthorPaper(
	AuthorId INT not null ,
	PaperId INT not null,
	PRIMARY KEY(AuthorId,PaperId) 
)
go
CREATE TABLE ReviewReport(
	ReviewReportID INT not null PRIMARY KEY IDENTITY(1,1),
	PaperId INT not null,
	ReviewerId INT not null ,
	ReviewDate DATE,
	grade int CHECK(grade>=0 AND grade<=10),
	Condentiality INT,
	Note text,
	[status] int not null
	CONSTRAINT UQ_ReviewReport UNIQUE(PaperId,ReviewerId)
)
go
CREATE TABLE PaperField(
	PaperId INT not null ,
	FieldId INT not null ,
	PRIMARY KEY(PaperId,FieldId)
)
go 

CREATE TABLE Manager(
	JournalId INT not null UNIQUE,
	AccountId INT not null UNIQUE,
	PRIMARY KEY (JournalId,AccountId)
)
go 
CREATE TABLE JournalField(
	JournalId INT not null UNIQUE,
	FieldId INT not null UNIQUE,
	PRIMARY KEY (JournalId,FieldId)
)
-- kết thúc bảng nối--
-- Thêm Khóa Ngoại--

ALTER TABLE Reviewer
ADD FOREIGN KEY (AccountId) REFERENCES Account(AccountId);
ALTER TABLE ReviewerField
ADD FOREIGN KEY (ReviewerId) REFERENCES Reviewer(ReviewerId);
ALTER TABLE ReviewerField
ADD FOREIGN KEY (FieldId) REFERENCES Field(FieldId);
ALTER TABLE Author
ADD FOREIGN KEY (AccountId) REFERENCES Account(AccountId);
ALTER TABLE Invitation
ADD FOREIGN KEY (ReviewerId) REFERENCES Reviewer(ReviewerId);
ALTER TABLE Invitation
ADD FOREIGN KEY (PaperId) REFERENCES Paper(PaperId);
ALTER TABLE ReviewReport
ADD FOREIGN KEY (PaperId) REFERENCES Paper(PaperId);
ALTER TABLE ReviewReport
ADD FOREIGN KEY (ReviewerId) REFERENCES Reviewer(ReviewerId);
ALTER TABLE AuthorPaper
ADD FOREIGN KEY (AuthorId) REFERENCES Author(AuthorId);
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
ALTER TABLE JournalField
ADD FOREIGN KEY (JournalId) REFERENCES Journal(JournalId);
ALTER TABLE JournalField
ADD FOREIGN KEY (FieldId) REFERENCES Field(FieldId);
ALTER TABLE AuthorPaper
ADD FOREIGN KEY (PaperId) REFERENCES Paper(PaperId);

