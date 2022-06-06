from select import select
import pymysql

# Executes any Query, except select
def executeQuery(query):
    connection = pymysql.connect(
        user="group5a",
        password="_}2nSW6%?3hyr9Z",
        host="mysql.labthreesixfive.com",
        db="group5a",
        port=3306,
    )

    with connection.cursor() as cursor:
        cursor.execute(query)
        ret = cursor.lastrowid
    connection.commit()
    connection.close()

    return ret


# Executes any Select Query
def executeSelectQuery(query):
    connection = pymysql.connect(
        user="group5a",
        password="_}2nSW6%?3hyr9Z",
        host="mysql.labthreesixfive.com",
        db="group5a",
        port=3306,
    )
    with connection.cursor() as cursor:
        cursor.execute(query)
    ret = cursor.fetchall()
    connection.commit()
    connection.close()
    return ret


# Creates new Profile
def createProfile(name="anonymous", userLabel="anonymous", category="Experience"):

    query = f"""
    INSERT INTO Profiles (Name, UserLabel, Category, Code) VALUES ("{name}", "{userLabel}", "{category}", NULL)
    """
    profile_id = executeQuery(query)
    return profile_id


# Creates new SurveySubmission
def createSurveySubmission(survey_id, profile_id):

    query = f"""
    INSERT INTO SurveySubmissions (Status, SurveyId, ExperienceProfileId) VALUES ("Provisional", {survey_id}, {profile_id})
    """
    sub_id = executeQuery(query)
    return sub_id


def insertResponses(sub_id, qnumbers, cnumbers):
    values = []

    for qnumber, cnumber in zip(qnumbers, cnumbers):
        values.append(f"({sub_id}, {qnumber}, {cnumber})")

    values = ", ".join(values)
    query = f"INSERT INTO Responses (SurveySubmissionId, QuestionId,SelectedChoiceId) VALUES {values}"
    executeQuery(query)


# Aggregates answers into DescriptorScores table
def insertDescriptorScores(profile_id, qnumbers, cnumbers, survey_id):
    desc_scores = {}

    for qnumber, cnumber in zip(qnumbers, cnumbers):
        query = f"""
        SELECT 
            JobDescriptor
        FROM
            Questions
        WHERE
            QNumber = {qnumber} AND SurveyId = {survey_id}
        """

        # Getting descriptor name from Question
        desc_name = executeSelectQuery(query)[0][0]

        # Some questions don't match to a descriptor
        if not desc_name:
            continue

        # Formatting differences from Question and JobDescriptor tables
        desc_name = desc_name.split()
        desc_name = " ".join([w[0].upper() + w[1:] for w in desc_name])

        query = f"""
        SELECT 
            JobDescriptors.Id
        FROM
            Questions
        JOIN JobDescriptors ON JobDescriptors.Characteristic = "{desc_name}"
        WHERE
            QNumber = {qnumber} AND SurveyId = {survey_id}
        """

        # Descriptor Id
        desc_id = executeSelectQuery(query)
        if desc_id:
            desc_id = desc_id[0][0]
        else:
            continue

        if desc_id not in desc_scores.keys():
            desc_scores[desc_id] = []

        if cnumber != 0:
            desc_scores[desc_id].append(cnumber)

    for desc_id, desc_vals in desc_scores.items():
        if not desc_vals:
            continue

        score = sum(desc_vals) / len(desc_vals)
        query = f"INSERT INTO DescriptorScores (Score, Importance, JobDescriptorId, ProfileId) VALUES ({score}, NULL, {desc_id}, {profile_id})"
        executeQuery(query)
    