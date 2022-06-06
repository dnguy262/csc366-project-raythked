from flask import Flask, jsonify, request
import json 

import db

app = Flask(__name__)


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
    # data = request.get_json()
    # survey_id = int(data['survey_id'])
    survey_id = 1

    # Creates anonymous profile for each submission
    profile_id = db.createProfile()
    print("created Profile")
    print(profile_id)

    # Creates anonymous profile for each submission
    sub_id = db.createSurveySubmission(survey_id, profile_id)
    print("created SurveySubmission")

    # qnumbers, cnumbers = zip(*data['results'])
    qnumbers = [12, 13]
    cnumbers = [3, 4]
    # Populates Responses Table
    db.insertResponses(sub_id, qnumbers, cnumbers)
    print("inserted Responses")

    # Populates DescriptorScores Tables
    db.insertDescriptorScores(profile_id, qnumbers, cnumbers, survey_id)
    print("inserted DescriptorScores")


    # TODO : Call recomendation engine and return 
    response = {}
    
    return jsonify(response)
