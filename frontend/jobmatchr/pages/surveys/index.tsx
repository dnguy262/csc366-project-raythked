import type { NextPage } from 'next';
import { MatchrPage } from '../../modules/layout'; 
import { Grid, Typography } from '@mui/material';
import { SurveyCard } from '../../modules/cards/survey.card';

const Surveys: NextPage = () => {
  return (
    <MatchrPage>
      <Grid container spacing={4}>
        {/* TODO: get data from api */}
        <Grid item xs={6} md={4} lg={3}><SurveyCard /></Grid>
        <Grid item xs={6} md={4} lg={3}><SurveyCard /></Grid>
        <Grid item xs={6} md={4} lg={3}><SurveyCard /></Grid>
        <Grid item xs={6} md={4} lg={3}><SurveyCard /></Grid>
      </Grid>
      
    </MatchrPage>
  );
};

export default Surveys;
