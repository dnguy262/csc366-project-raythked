import React, { useContext } from "react";
import type { NextPage } from "next";
import { Button, Grid, OutlinedInput, Typography } from "@mui/material";
import { css, Theme } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";

import { SurveyCard } from "../../modules/cards/survey.card";
import { MatchrPage } from "../../modules/layout";
import { SurveyContext } from "../../modules/providers/surveys.provider";
import { Survey } from "../../modules/surveys/types/survey.interface";
import Link from "next/link";

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
`;

const Surveys: NextPage = () => {
  const { getSurveys } = useContext(SurveyContext);

  const surveys = getSurveys() as Survey;
  const surveyEntries = Object.entries(surveys);

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    console.log("hello this does nothing atm, thanks for trying.");
  };

  return (
    <MatchrPage>
      <Typography variant="h1" mb={4}>Surveys</Typography>
      <div css={surveyStyles}>
        <OutlinedInput
          onChange={searchHandler}
          fullWidth
          startAdornment={<SearchIcon fontSize="large" sx={{ mr: 1 }} />}
          placeholder="Search Surveys"
        />
        <Button variant="outlined" size="large" color="secondary">
          Upload CSV
        </Button>
      </div>
      <Grid container spacing={4}>
        {surveyEntries.map(([surveyId, { Description, Name, Title }]) => (
          <Link key={surveyId} passHref href={`surveys/survey?id=${surveyId}`}>
            <Grid item xs={6} md={4} lg={3}>
              <SurveyCard Description={Description} Name={Name} />
            </Grid>
          </Link>
        ))}
        <Grid item xs={6} md={4} lg={3}>
          <SurveyCard
            Description={
              "This is just a placeholder description that was put in as an example to show the client."
            }
            Name={"Placeholder Title"}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <SurveyCard
            Description={
              "This is just a placeholder description that was put in as an example to show the client."
            }
            Name={"Placeholder Title"}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <SurveyCard
            Description={
              "This is just a placeholder description that was put in as an example to show the client."
            }
            Name={"Placeholder Title"}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <SurveyCard
            Description={
              "This is just a placeholder description that was put in as an example to show the client."
            }
            Name={"Placeholder Title"}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <SurveyCard
            Description={
              "This is just a placeholder description that was put in as an example to show the client."
            }
            Name={"Placeholder Title"}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <SurveyCard
            Description={
              "This is just a placeholder description that was put in as an example to show the client."
            }
            Name={"Placeholder Title"}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <SurveyCard
            Description={
              "This is just a placeholder description that was put in as an example to show the client."
            }
            Name={"Placeholder Title"}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <SurveyCard
            Description={
              "This is just a placeholder description that was put in as an example to show the client."
            }
            Name={"Placeholder Title"}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <SurveyCard
            Description={
              "This is just a placeholder description that was put in as an example to show the client."
            }
            Name={"Placeholder Title"}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <SurveyCard
            Description={
              "This is just a placeholder description that was put in as an example to show the client."
            }
            Name={"Placeholder Title"}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <SurveyCard
            Description={
              "This is just a placeholder description that was put in as an example to show the client."
            }
            Name={"Placeholder Title"}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <SurveyCard
            Description={
              "This is just a placeholder description that was put in as an example to show the client."
            }
            Name={"Placeholder Title"}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <SurveyCard
            Description={
              "This is just a placeholder description that was put in as an example to show the client."
            }
            Name={"Placeholder Title"}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <SurveyCard
            Description={
              "This is just a placeholder description that was put in as an example to show the client."
            }
            Name={"Placeholder Title"}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <SurveyCard
            Description={
              "This is just a placeholder description that was put in as an example to show the client."
            }
            Name={"Placeholder Title"}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <SurveyCard
            Description={
              "This is just a placeholder description that was put in as an example to show the client."
            }
            Name={"Placeholder Title"}
          />
        </Grid>
      </Grid>
    </MatchrPage>
  );
};

export default Surveys;
