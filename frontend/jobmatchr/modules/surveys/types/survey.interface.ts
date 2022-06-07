export interface Survey {
    [key: string]: SurveyData
}

export interface SurveyData {
    Description: string,
    Name: string,
    Questions: Record<string, Question>,
    Title: string
}

export type Question = {
    Choices: Record<string, {Value: string}>;
    Text: string;
};

export interface SurveyRequestBody {
    survey_id: number,
    results: Array<{ qnumber: number, cnumber: number }>
}