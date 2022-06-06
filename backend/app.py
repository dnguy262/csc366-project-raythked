from tkinter import N
from urllib import response
from flask import Flask
import json

import db

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/surveys")
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

    return json.dumps(response)

get_surveys()