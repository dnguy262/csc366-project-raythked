from tkinter import N
from urllib import response
from flask import Flask
import db

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/surveys')
def get_surveys():
    query = """
        SELECT
            Surveys.Title,
            Surveys.Name,
            Surveys.Description,
            Surveys.Id,
            Questions.Text,
            Questions.QNumber,
            Choices.Value,
            Choices.CNumber,
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
        title, name, desc, s_id, q_id, q_text, qnumber, c_val, cnumber = d
        pass

    response = {
        "Surveys" : [
            {
            "Id": None,
            "Title": None,
            "Name": None,
            "Description": None,
            "Question" : [{
                "QNumber": None,
                "Text": None,
                "Choices" : [{
                    "CNumber": None,
                    "Value": None,
                }]
            }]
            }
        ]
    }
    return response
