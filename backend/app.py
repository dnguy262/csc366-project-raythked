from pyparsing import identchars
from flask import Flask, jsonify, request
from flask_cors import CORS
from numpy import dot
from numpy.linalg import norm
from operator import itemgetter
import json 
import pymysql
import db

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/surveys", methods=['GET'])
def get_surveys():
    query = """
        SELECT
            Surveys.Title,
            Surveys.Name,
            Surveys.Description,
            Surveys.Id,
            Questions.QNumber,
            Questions.Text,
            Choices.Value,
            Choices.CNumber
        FROM
            Surveys
            JOIN Questions ON Id = SurveyId
            JOIN Choices on Id = Choices.SurveyId
            AND Questions.QNumber = Choices.QNumber
        ORDER BY
            Surveys.Id,
            Questions.QNumber,
            CNumber;
    """
    data = db.executeSelectQuery(query)
    response = {}
    for d in data:
        title, name, desc, s_id, qnumber, q_text, c_val, cnumber = d
        if s_id not in response.keys():
            response[s_id] = {
                "Title": title,
                "Name": name,
                "Description": desc,
                "Questions": {}
            }
        if qnumber not in response[s_id]["Questions"].keys():
            response[s_id]["Questions"][qnumber] = {
                "Text": q_text,
                "Choices": {}
            }
        if cnumber not in response[s_id]["Questions"][qnumber]["Choices"].keys():
            response[s_id]["Questions"][qnumber]["Choices"][cnumber] = {
                "Value": c_val
            }

    return jsonify(response)

@app.route("/api/survey", methods=['POST'])
def post_survey():
    
    # TODO : Test w/ real data from frontend
    request_data = request.get_json()
    # survey_id = 1
    survey_id = int(request_data['survey_id'])
    resultObjList = request_data['results'] # [{qnumber, cnumber}, {qnumber, cnumber}]
    qnumbers = []
    cnumbers = []
    for obj in resultObjList:
        qnumbers.append(int(obj['qnumber']))
        cnumbers.append(int(obj['cnumber']))

    # Creates anonymous profile for each submission
    profile_id = db.createProfile()
    print("created Profile")
    print(profile_id)

    # Creates anonymous profile for each submission
    sub_id = db.createSurveySubmission(survey_id, profile_id)
    print("created SurveySubmission")
 
    # qnumbers, cnumbers = zip(*data['results'])
    # qnumbers = [12, 13]
    # cnumbers = [3, 4]
    # Populates Responses Table
    db.insertResponses(sub_id, qnumbers, cnumbers)
    print("inserted Responses")

    # Populates DescriptorScores Tables
    db.insertDescriptorScores(profile_id, qnumbers, cnumbers, survey_id) 
    print("inserted DescriptorScores")

    # Executes any Select Query
    def executeSelect(query):
        connection = pymysql.connect(
                    user     = "group5a",
                    password = "_}2nSW6%?3hyr9Z",
                    host     = "mysql.labthreesixfive.com",
                    db       = "group5a",
                    port     = 3306
        )
        with connection.cursor() as cursor:
            rows_count = cursor.execute(query)
        connection.commit()
        connection.close()
        if rows_count > 0:
            return cursor.fetchall()
        else:
            return None

    def get_onet_profiles():
        query = """SELECT Id FROM Profiles WHERE Category = 'ONET';"""
        ids = executeSelect(query)

        ids_lst = []
        for id in ids:
            ids_lst.append(id[0])

        return ids_lst

    # """
    # WITH t1 AS (SELECT JobDescriptorId, Score from DescriptorScores where ProfileId = 1 order by JobDescriptorId),
    # t2 as (SELECT JobDescriptorId, Score from DescriptorScores where ProfileId = 287 order by JobDescriptorId)
    # SELECT * FROM t1 JOIN t2 ON JobDescriptorId ORDER BY JobDescriptorId;
    # """

    # for every ONET job
    onet_job_ids = get_onet_profiles()
    onet_cosine_similarity = {}
    
    #job_id is a tuple...
    for job_id in onet_job_ids: 
        print("calculating jobid =" + str(job_id))
        query = f"""
            WITH t1 AS (SELECT JobDescriptorId, Score FROM DescriptorScores WHERE ProfileId = {profile_id}),
            t2 AS (SELECT JobDescriptorId, Score FROM DescriptorScores WHERE ProfileId = {job_id})
            SELECT t1.JobDescriptorId, t1.Score, t2.Score FROM t1 JOIN t2 ON t1.JobDescriptorId = t2.JobDescriptorId ORDER BY t1.JobDescriptorId;
            """ # first col is experience profile, second col is onet job profile

        #need to deal with empty sets
        if executeSelect(query) is not None:
            job_descriptor_ids, experience_scores, onet_scores = zip(*executeSelect(query)) # executeSelect returns [(1, 6, 7), ...]
            experience_scores_list = list(experience_scores)
            onet_scores_list = list(onet_scores)

            similarity_score = dot(experience_scores_list, onet_scores_list)/(norm(experience_scores_list)*norm(onet_scores_list))
            onet_cosine_similarity[job_id] = similarity_score # dictionary: onetjobid --> similarity score 
    
    print("length of onet cosine similarity= " + str(len(onet_cosine_similarity)))
    #take top 10 values from onet_cosine_similarity
    #RESOURCE: https://www.geeksforgeeks.org/python-n-largest-values-in-dictionary/
    N = 10
    results = dict(sorted(onet_cosine_similarity.items(), key = itemgetter(1), reverse = True)[:N]) #key : profileid, value: similarity score

    # get names of recommended jobs
    recommended_job_list = []
    
    job_ids_list = [int(k) for k in results.keys()]

    for job_id in job_ids_list:

        query = f"""
            SELECT Name
            FROM Profiles
            WHERE Id = {job_id};
            """
        job_name = executeSelect(query)[0][0]

        query = f"""
            SELECT Code
            FROM Profiles
            WHERE Id = {job_id};
        """
        job_code = executeSelect(query)[0][0] # (Code)

        query = f"""
            SELECT Description
            FROM ONETJobInfo
            WHERE Code = "{job_code}";
        """
        job_desc = executeSelect(query)[0][0] # (Desc)

        job_obj = {
            "job_id": job_id,
            "job_code": job_code,
            "job_name": job_name,
            "job_desc": job_desc,
            "cos_similarity": onet_cosine_similarity[job_id]
        }

        recommended_job_list.append(job_obj)
    
    return jsonify(recommended_job_list) 
