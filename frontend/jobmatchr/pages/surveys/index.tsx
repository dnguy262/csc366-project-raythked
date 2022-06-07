import React from 'react';
import type { NextPage } from 'next';
import { Button, Grid, OutlinedInput } from '@mui/material';
import { css, Theme } from '@emotion/react';
import SearchIcon from '@mui/icons-material/Search';

import { SurveyCard } from '../../modules/cards/survey.card';
import { MatchrPage } from '../../modules/layout'; 

const surveyStyles = (theme: Theme) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing(4)};

    .MuiOutlinedInput-root {
      max-width: 40%;
    }

    .MuiButton-root {
      border-width: 2px;
      font-weight: 700;
    }
  }
`

const Surveys: NextPage = () => {
  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    console.log('hello this does nothing atm, thanks for trying.');
  }

  return (
    <MatchrPage>
      <div css={surveyStyles}>
        <OutlinedInput
          onChange={searchHandler}
          fullWidth
          startAdornment={<SearchIcon fontSize="large" sx={{mr: 1}} />}
          placeholder='Search Surveys'
        />
        <Button variant="outlined" size="large" color="secondary">Upload CSV</Button>
      </div>
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
