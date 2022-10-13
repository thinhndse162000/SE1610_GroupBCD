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

-- INSERT DATA
-- duy123, duy123, duy123, duynguyen, bcd123, ejournal
INSERT INTO Account
  (email, password, phone, firstName, lastName, organization, DateOfBirth, role, status)
VALUES
  ('nguyenduduy233@gmail.com', '$2a$10$v5VVaxM8IQ579t529zVrN.NPFDmC4BQNLmqOyLQGWc5CGXJqLwBnW', '9944823835', 'Duy', 'Nguyen', 'FPT', '2002-05-25', 'MEMBER', 'OPEN'),
  ('duy@gmail.com', '$2a$10$agxfXpT8HRFdITllgTqwVeEPZRvnc2pPxSgdK3QPsLy9CYeNtcNc.', '0137275723', 'Duy Du', 'Ng', 'FPT', '2002-05-25', 'MEMBER', 'OPEN'),
  ('thinh@gmail.com', '$2a$10$XMjee4bxLs44QZMJRXBk7.P9JOkBWbp8HVV5htCECIOfP.a/sW64C', '4100569746', 'Thinh', 'Nguyen', 'FPT', '2002-05-25', 'MEMBER', 'OPEN'),
  ('nam@gmail.com', '$2a$10$u6xDaHIKEWQuCTTn4xkn2.kHRMzgGCwRfmlGDW9VRnIpNnz6HoZj.', '9805066264', 'Nam', 'Nguyen', 'FPT', '2002-05-25', 'MEMBER', 'OPEN'),
  ('tue@gmail.com', '$2a$10$5IBOUGV1UyeXsBAkqXPdfeOB3m3IKzV8KHFvxZ3lPzDfRTjDuSixG', '6896272792', 'Tue', 'Nguyen', 'FPT', '2002-05-25', 'MEMBER', 'OPEN'),
  ('bcd@gmail.com', '$2a$10$MfNx2TVpwsPRWSpNWUxmQeJbmy/YhHUXnQR/N5IJ5btwrH3U2PhHC', '6838090326', 'BCD', 'Nguyen', 'FPT', '2002-05-25', 'MEMBER', 'OPEN'),
  ('manager@gmail.com', '$2a$10$Ho0ZmhMKJyh6vPKiW9Gzc.eGijS54ME/vq0oM2qutPAENS3kurkve', '6838090328', 'Manager', 'Manager', 'FPT', '2002-05-25', 'MANAGER', 'OPEN');

INSERT INTO Reviewer
  (ReviewerId, Invitable)
VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 1),
  (5, 1),
  (6, 1),
  (7, 0);

INSERT INTO Author
  (AuthorId, Introduction, Education, Address)
VALUES
  (1, 'Duy day', 'FPT', '123 O dau do'),
  (2, 'Duy day', 'FPT', '123 O dau do'),
  (3, 'Duy day', 'FPT', '123 O dau do'),
  (4, 'Duy day', 'FPT', '123 O dau do'),
  (5, 'Duy day', 'FPT', '123 O dau do'),
  (6, 'Duy day', 'FPT', '123 O dau do'),
  (7, 'Manager day', 'FPT', '123 O dau do');
  
INSERT INTO Field
  (FieldName)
VALUES
  ('Physics'),
  ('Chemistry'),
  ('Math'),
  ('Computer Science'),
  ('Culture'),
  ('Economics'),
  ('Biologoy'),
  ('History'),
  ('Medical'),
  ('Psychology'),
  ('Sociology'),
  ('Philosophy');
  

INSERT INTO Journal
  (name, Introduction, organization, issn, status)
VALUES
  ('Physics And Life', 'This is a physic journal', 'FPT', '123-1234', 'OPEN'),
  ('Chemistry And Life', 'This is a journal Chemistry', 'FPT', '123-1235', 'OPEN'),
  ('Math And Life', 'This is a journal Math', 'FPT', '123-1236', 'OPEN'),
  ('Computer Science And Life', 'This is a journal Computer Science', 'FPT', '123-1237', 'OPEN'),
  ('Culture And Life', 'This is a journal Culture', 'FPT', '123-1238', 'OPEN'),
  ('Economics And Life', 'This is a journal Economics', 'FPT', '123-1239', 'OPEN');

INSERT INTO JournalField
  (journalId, FieldId)
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5),
  (6, 6);

INSERT INTO Paper
  (title, abstract, SubmitTime, LinkPDF, NumberOfPage, Grade, Status, JournalID, authorID)
VALUES
  ('Evaluation of gamma ray shielding characteristics', 'In this work, we reported the gamma ray shielding factors for barium phosphate glasses with composition yCaF2–(50−y)BaO–50P2O5 (y = 0, 2, 4, 6, 8 and 10 mol%). The Phy-X/PSD software has been used to report the attenuation and penetration factors for this glass system at different energies. The linear attenuation coefficient (LAC) values are found to reduce exponentially with increasing the energy and they range from 0.176 to 0.496 cm−1 (for CaBaP1) and 0.184–0.548 cm−1 (for CaBaP6). It was found that the addition of barium oxide (BaO) causes an increase in the LAC values from 0.697 to 0.787 cm−1 at 0.284 MeV, and from 0.259 to 0.273 cm−1 at 0.662 MeV. The effective atomic number (Zeff) results revealed the higher photons interaction possibility at the higher BaO content. The maximum Zeff is reported at 0.284 MeV and equal to 18.33 for CaBaP1and 20.15 for CaBaP6. Phy-X/PSD program has been used to find the half value layer (HVL) for the glasses under evaluation between 0.284 and 1.33 MeV. The HVL results showed that more gamma rays are being shielded at 0.284 MeV, whereas the possibility of photon shielding is decreased with the increasing of the energy. The tenth value layer (TVL) values were decreased with increase in BaO concentrations and increased with increase in the energy. CaBaP6 has the minimum TVL (4.206 cm at 0.284 MeV, 8.445 cm at 0.662 MeV and 12.252 cm at 1.275 MeV).', '2022-10-01', '1.pdf', 10, 8, 'ACCEPTED', 1, 1),
  ('Ionizing photons attenuation characterization of quaternary tellurite', 'In this work, photon attenuation performances of the selected TeO2–ZnO–Nb2O5–Gd2O3 glasses have been investigated at various energy points using Phy-X/PSD software. Additionally, neutron shielding properties have been estimated. Dependencies of radiation attenuation capacities with the photon energy and the compositions have been evaluated. According to the obtained results, the mass attenuation coefficients and the effective atomic numbers of tellurite glasses doped with Gd2O3 content of 2.5 mol% are higher than rest of the other samples. Moreover, half value layer and mean free path values of the investigated glass samples recommended that the attenuation capabilities of the ionizing photons increase as the densities of samples increase, hence, the glass having high density must be considered for high attenuation effectiveness. The mass attenuation coefficients vary from 4.87426 to 5.25794 cm2/g for Gd2O3 concentrations with 0 (Gd = 0.0) and 2.5 mol% (Gd = 2.5) at 0.06 MeV. The mean free path values at 0.015 MeV lies within the range 0.00407–0.00493 cm, at 0.1 MeV within the range of 0.1256 to 0.1519 cm, while at 15 MeV has the range of 4.634 to 5.281 cm. The obtained results displayed that among the studied glasses, Gd = 2.5 glass sample with Gd2O3 of 2.5 mol% is found to have superior gamma-ray shielding effectiveness due to having both higher μ/ρ and lower mean free path values.', '2022-09-15', '2.pdf', 15, 8, 'ACCEPTED', 1, 1),
  ('Improving PM2.5 forecast during haze episodes over China based on a coupled', 'To improve the PM2.5 forecast during severe haze episodes, we developed a data assimilation system based on the four-dimensional local ensemble transform Kalman filter (4D-LETKF) and the WRF-Chem model to assimilate surface PM2.5 observations. The data assimilation system was successful in optimizing the initial PM2.5 mass concentrations. The root-mean-square error (RMSE) of the initial PM2.5 concentrations after assimilation decreased at 76.75% of the stations and the RMSE reduction exceeds 30% at 20.7% of the stations. The correlation coefficients for the PM2.5 analyses increased by more than 0.3 at 33% of the stations. The forecasts for the spatial distribution and evolution of the haze were improved remarkably after assimilation while the forecasts without assimilation usually significantly underestimated the PM2.5 mass concentrations during the severe haze episodes. The RMSE of the 24-h forecasts after assimilation can be reduced by 32.02% in the polluted regions. During haze episodes, the 48-h forecasts after assimilation can benefit from the assimilation to a similar extent with the 24-h forecasts. Both the forecast accuracy and the duration of assimilation benefits were improved remarkably which demonstrate the effectiveness of the 4D-LETKF-PM2.5 data assimilation system, and further experiments are to be conducted to improve its performance.', '2022-09-15', '3.pdf', 20, 5, 'REJECTED', 2, 1),
  ('Math for 2s and 3s: The impact of parent-child math activities on parents’', 'Mathematics knowledge and skills are critical for success in school and beyond. Professional interest in the role parents play in young childrens math development has been increasing, but there is still relatively little rigorous research on this topic, especially for children younger than 4 years old and as compared with research on parents’ role in literacy development. This study provided parents of 2- and 3-year-old children with a 12-week series of simple, fun math activities to do with their children and used a randomized controlled design to examine whether the program had effects on parents’ ideas and beliefs about math for young children, their math interactions with their children, and the childrens learning outcomes. The sample consisted of 358 families who were randomly assigned to receive the early math activity program, which was delivered via text messaging, or not. Findings indicated that the program strengthened parents’ beliefs that math was important for young children, increased their engagement in math activities with their child (particularly while they were receiving the program), and enhanced childrens skill in subitizing, a foundational early math concept. The program did not significantly affect childrens skill levels in other math domains, parents’ own math self-efficacy, or parent and child outcomes not related to math.', '2022-08-20', '4.pdf', 20, null, 'REVIEWING', 3, 2),
  ('Widening the lens of family math engagement', 'Young children’s math learning opportunities in families appear to relate to long-term math achievement and attitudes. While there is growing interest in promoting families’ support of children’s math learning, existing family math models do not fully capture sources of variation in how families support early math learning. We propose an expanded conceptual framework incorporating macrosystem and mesosystem dimensions, along with developmental considerations, that may influence family math engagement and children’s math learning. We use this framework to guide a systematic review on family math engagement from birth through early elementary school. Reviewing 194 articles from peer-reviewed journals, we asked three questions: 1) How do different aspects of family ', '2022-08-20', '5.pdf', 18, null, 'REVIEWING', 3, 2),
  ('A method for embedding a computer vision application into a wearable device', 'Pattern classification applications can be found everywhere, especially the ones that use computer vision. What makes them difficult to embed is the fact that they often require a lot of computational resources. Embedded computer vision has been applied in many contexts, such as industrial or home automation, robotics, and assistive technologies. This work performs a design space exploration in an image classification system and embeds a computer vision application into a minimum resource platform, targeting wearable devices. The feature extractor and the classifier are evaluated for memory usage and computation time. A method is proposed to optimize such characteristics, leading to a reduction of over 99% in computation time and 92% in memory usage, with respect to a standard ', '2022-08-15', '6.pdf', 22, null, 'PENDING', 1, 2);

INSERT INTO PaperField
  (paperId, FieldId)
VALUES
  (1, 1), (1, 2), (1, 3),
  (2, 1), (2, 2), 
  (3, 1), (3, 2), (3, 6),
  (4, 3),
  (5, 3), (5, 5),
  (6, 4), (6, 5), (6, 6);

INSERT INTO ReviewerField
  (ReviewerId, FieldId)
VALUES
  (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
  (2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6),
  (3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6),
  (4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6),
  (5, 1), (5, 2), (5, 3), (5, 4), (5, 5), (5, 6),
  (6, 1), (6, 2), (6, 3), (6, 4), (6, 5), (6, 6);

-- FOR Paper ID 1
INSERT INTO Invitation
  (ReviewerId, PaperId, InviteDate, status)
VALUES
  (2, 1, '2022-10-01', 'ACCEPTED'),
  (3, 1, '2022-10-01', 'ACCEPTED'),
  (4, 1, '2022-10-01', 'REJECTED'),
  (5, 1, '2022-10-01', 'ACCEPTED'),
  (6, 1, '2022-10-01', 'CANCEL');

-- FOR PAPER ID 2
INSERT INTO Invitation
  (ReviewerId, PaperId, InviteDate, status)
VALUES
  (2, 2, '2022-10-01', 'ACCEPTED'),
  (3, 2, '2022-10-01', 'ACCEPTED'),
  (4, 2, '2022-10-01', 'REJECTED'),
  (5, 2, '2022-10-01', 'ACCEPTED'),
  (6, 2, '2022-10-01', 'CANCEL');

-- FOR PAPER ID 3
INSERT INTO Invitation
  (ReviewerId, PaperId, InviteDate, status)
VALUES
  (2, 3, '2022-10-01', 'ACCEPTED'),
  (3, 3, '2022-10-01', 'ACCEPTED'),
  (4, 3, '2022-10-01', 'REJECTED'),
  (5, 3, '2022-10-01', 'ACCEPTED'),
  (6, 3, '2022-10-01', 'CANCEL');

-- FOR PAPER ID 4
INSERT INTO Invitation
  (ReviewerId, PaperId, InviteDate, status)
VALUES
  (1, 4, '2022-10-01', 'ACCEPTED'),
  (3, 4, '2022-10-01', 'ACCEPTED'),
  (4, 4, '2022-10-01', 'REJECTED'),
  (5, 4, '2022-10-01', 'ACCEPTED'),
  (6, 4, '2022-10-01', 'CANCEL');

-- FOR PAPER ID 5
INSERT INTO Invitation
  (ReviewerId, PaperId, InviteDate, status)
VALUES
  (1, 5, '2022-10-01', 'ACCEPTED'),
  (3, 5, '2022-10-01', 'ACCEPTED'),
  (4, 5, '2022-10-01', 'REJECTED'),
  (5, 5, '2022-10-01', 'ACCEPTED'),
  (6, 5, '2022-10-01', 'CANCEL');

-- FOR PAPER ID 6
INSERT INTO Invitation
  (ReviewerId, PaperId, InviteDate, status)
VALUES
  (1, 6, '2022-10-01', 'ACCEPTED'),
  (3, 6, '2022-10-01', 'PENDING'),
  (4, 6, '2022-10-01', 'REJECTED'),
  (5, 6, '2022-10-01', 'ACCEPTED'),
  (6, 6, '2022-10-01', 'PENDING');

-- FOR PAPER ID 1, 2, 3
INSERT INTO ReviewReport
  (ReviewerId, PaperID, ReviewDate, grade, Confidentiality, verdict, Note, status)
VALUES
  (2, 1, '2022-10-02', 10, 10, 'ACCEPTED', 'This is amazing', 'DONE'),
  (3, 1, '2022-10-02', 9, 10, 'ACCEPTED', 'This is very good', 'DONE'),
  (5, 1, '2022-10-02', 5, 10, 'REJECTED', 'This is bad', 'DONE'),
  (2, 2, '2022-10-02', 10, 10, 'ACCEPTED', 'This is amazing', 'DONE'),
  (3, 2, '2022-10-02', 9, 10, 'ACCEPTED', 'This is very good', 'DONE'),
  (5, 2, '2022-10-02', 5, 10, 'REJECTED', 'This is bad', 'DONE'),
  (2, 3, '2022-10-02', 6, 10, 'REJECTED', 'This is very very bad', 'DONE'),
  (3, 3, '2022-10-02', 9, 10, 'ACCEPTED', 'This is very good', 'DONE'),
  (5, 3, '2022-10-02', 5, 10, 'REJECTED', 'This is bad', 'DONE');

-- FOR PAPER ID 4, 5 (Reviewing)
INSERT INTO ReviewReport
  (ReviewerId, PaperID, ReviewDate, grade, Confidentiality, verdict, Note, status)
VALUES
  (1, 4, '2022-10-02', 9, 10, 'ACCEPTED', 'Well done', 'DONE'),
  (3, 4, '2022-10-02', null, null, null, null, 'PENDING'),
  (5, 4, '2022-10-02', null, null, null, null, 'PENDING'),
  (1, 5, '2022-10-02', 9, 10, 'ACCEPTED', 'The paper is very good', 'DONE'),
  (3, 5, '2022-10-02', 8, 9, 'ACCEPTED', 'This is not bad at all', 'DONE'),
  (5, 5, '2022-10-02', null, null, null, null, 'PENDING');

INSERT INTO Issue
  (JournalID, Volume, Issue, startDate, endDate, NumberOfPage)
VALUES
  (1, 1, 1, '2022-08-01', '2022-10-01', 25)

INSERT INTO Publish
  (PaperId, IssueId, PublishDate, AccessLevel)
VALUES
  (1, 1, '2022-09-15', 'OPEN'),
  (2, 1, '2022-09-15', 'PRIVATE');

INSERT INTO Manager
  (journalId, accountId)
VALUES
  (1, 7)

-- TODO: Invoice
