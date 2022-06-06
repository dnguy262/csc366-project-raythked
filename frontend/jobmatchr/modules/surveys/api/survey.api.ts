import axios from 'axios';
import { SurveyRequestBody } from '../types/survey.interface';

const surveyApiClient = axios.create({
    // TODO: hardcoded for now, replace with local/staging/test/prod env variable later
    baseURL: 'http://127.0.0.1:5000/',
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const surveyApi = {
    getSurveys: () => surveyApiClient.get('/api/surveys').then(res => res.data).catch((err) => { throw Error(err) }),
    postSurveys: (data: SurveyRequestBody) => surveyApiClient.post('/surveys', { data }),
};