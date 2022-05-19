CREATE TABLE if not exists Surveys (
	Id INT AUTO_INCREMENT PRIMARY KEY,
	Title VARCHAR(255) NOT NULL, 
	Name  VARCHAR(255),
	Description TEXT
);

CREATE TABLE if not exists JobDescriptors (
    Id int AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    Dimensions VARCHAR(50),
    Description TEXT
);

CREATE TABLE if not exists Questions (
	Text TEXT NOT NULL, 
	SurveyId INT,
	QNumber INT,
	Type INT, 
	JobDescriptor varchar(255),
	PRIMARY KEY (QuestionId, QNumber),
	FOREIGN KEY (SurveyId) REFERENCES Surveys(Id),
	FOREIGN KEY (JobDescriptor) REFERENCES JobDescriptor(Name)
);

CREATE TABLE if not exists Choices (
	Text TEXT NOT NULL, 
	Value TEXT,
	QNumber INT,
	SurveyId INT,
	CNumber INT,
	PRIMARY KEY (SurveyId, QNumber, CNumber),
	FOREIGN KEY (QNumber) REFERENCES Questions(QNumber),
	FOREIGN KEY (SurveyId) REFERENCES Questions(Id)
);

CREATE TABLE if not exists UserAccounts (
	Id INT AUTO_INCREMENT PRIMARY KEY,
	UserName VARCHAR(255) NOT NULL,
	Notes TEXT,
	Category ENUM("Administrator", "Student", "Professional", "Interviewer")
);

CREATE TABLE if not exists Profiles (
	Id INT AUTO_INCREMENT PRIMARY KEY,
	Name VARCHAR(255) NOT NULL,
	UserLabel VARCHAR(255),
	Category ENUM("Experience", "ONET", "Ideal"),
	Code VARCHAR(20)
);

CREATE TABLE if not exists SurveySubmissions (
	Id INT AUTO_INCREMENT PRIMARY KEY,
	Status ENUM("Provisional","Reviewed"),
	SurveyId INT,
	ExperienceProfileId INT,
	FOREIGN KEY (SurveyId) REFERENCES Survey(Id),
	FOREIGN KEY (ExperienceProfileId) REFERENCES Profiles(Id)
);

CREATE TABLE if not exists DescriptorScores (
    Score INT NOT NULL, 
    Importance INT,
    JobDescriptorId INT,
    ProfileId INT,
    FOREIGN KEY (JobDescriptorId) REFERENCES JobDescriptors(Id),
    FOREIGN KEY (ProfileId) REFERENCES Profiles(Id)
);

CREATE TABLE if not exists Responses (
	SurveySubmissionId INT REFERENCES SurveySubmissions(Id),
	QuestionId INT REFERENCES Choices(Id),	
	SelectedChoiceId INT REFERENCES Choices(Id),
	PRIMARY KEY (SurveySubmissionId, QuestionId, SelectedChoiceId)
);

CREATE TABLE if not exists ONETJobInfo (
	Code VARCHAR(20),
	Title VARCHAR(255),
	IsStem BOOL,
	Description TEXT,
	BrightOutlook BOOL,
	Green BOOL,
	PRIMARY KEY (Code)
);

CREATE TABLE if not exists RecommendedJobLists(
	Id INT,
	RecType VARCHAR(255),
	IdealProfileId INT,
	FOREIGN KEY (IdealProfileId) REFERENCES Profiles(Id)
);

CREATE TABLE if not exists JobsToJobList(
	IdealProfileId INT,
	JobCode VARCHAR(20),
	PRIMARY KEY (IdealProfileId, JobCode),
	FOREIGN KEY (IdealProfileId) REFERENCES Profiles(Id),
	FOREIGN KEY (JobCode) REFERENCES Profiles(Code)
);
