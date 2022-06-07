import { useContext, useEffect, useRef, useState } from "react";
import { css, Theme } from "@emotion/react";
import { Button, Container, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Loading } from "../../modules/loading";
import { SurveyContext } from "../../modules/providers/surveys.provider";
import { useLocalStorage } from "../../modules/providers/window.provider";
import { RadioQuestion } from "../../modules/questions/radio.questions";
import { SelectQuestion } from "../../modules/questions/select.questions";
import { surveyApi } from "../../modules/surveys/api/survey.api";
import { questionText } from "../../modules/constants/question-text.constant";
import { SurveyData } from "../../modules/surveys/types/survey.interface";
import { LOCAL_STORAGE_TOKEN } from "../../modules/constants/local-storage.constant";
import { dummyData } from "../../modules/constants/test.constant";

const surveyStyles = (theme: Theme) => css`
  .submit-button {
    display: flex;
    justify-content: center;
    margin: ${theme.spacing(4, 0, 8, 0)};
  }
`;

type Props = React.HTMLAttributes<HTMLDivElement> & {
  // additional props here for stuff from api calls
};
const UserSurvey: NextPage<Props> = ({ ...props }) => {
  const [surveyId, setSurveyId] = useState("");
  const router = useRouter();
  const localStorage = useLocalStorage();

  const requestObj = useRef({
    survey_id: null,
    results: {},
  } as any).current;

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      // TODO: correct typing here, got lazy
      setSurveyId(id as any);
      requestObj.survey_id = +id!;
    }
  }, [router.isReady]);

  const { getSurveys } = useContext(SurveyContext);
  const { Description, Name, Questions } = (getSurveys(
    surveyId
  ) as SurveyData) ?? { Description: "", Name: "", Questions: {} }; // this is gross but works for now

  // some really gross short circuit logic. with better endpoint support, can leverage
  // getStaticPaths and getStaticProps to do a much better Next.js solution
  if (
    surveyId === "" ||
    Description === "" ||
    Name === "" ||
    Object.keys(Questions).length === 0
  ) {
    return (
      <Container
        maxWidth="xl"
        css={css`
          height: 100vh;
          display: flex;
          justify-content: center;
        `}
      >
        <Loading />
      </Container>
    );
  }

  const updateRequestObj = () => {
    const disciplineValue = document.querySelector("input")?.value;
    console.log(disciplineValue);
    // skip first one
    if (disciplineValue) {
      requestObj.results["1"] = +disciplineValue;
    }

    for (const qNumber of Object.keys(Questions)
      .sort((a, b) => +a - +b)
      .slice(1)) {
      const radioValue = document.querySelector<HTMLInputElement>(
        `.Mui-checked input[data-qnumber="${qNumber}"]`
      )?.value;
      if (radioValue) {
        requestObj.results[qNumber] = +radioValue;
      }
    }
  };

  // used for final conversion into data that POST request expects
  const submissionAdapter = () => {
    if (surveyId !== "1") {
      alert(
        "This survey is not yet implemented. Navigating back to Surveys page."
      );
      router.push("/surveys");
      return;
    }
    updateRequestObj();
    const results = Object.entries(requestObj.results).map(([qnumber, cnumber]) => ({ qnumber: +qnumber, cnumber}));

    // COMMENTED OUT FOR DEMO PURPOSES
    // if (results.length < 94) {
    //   alert(
    //     'There are unanswered questions. Select "Prefer not to Say" if you do not wish to answer.'
    //   );
    //   return;
    // }
    const data = {
      ...requestObj,
      results,
    };
    surveyApi
      .postSurveys(dummyData)
      // COMMENTED OUT FOR DEMO PURPOSES
      // .postSurveys(...data)
      .then((res) => {
        // save to localStorage
        localStorage.setItem(LOCAL_STORAGE_TOKEN, JSON.stringify(res.data));
      })
      .then(() => {
        router.push("/recommendations");
      })
      .catch((err) => {
        alert(`Failed to submit survey. \n Error: ${err}`);
      });
  };

  const questionsArray = Object.entries(Questions);

  return (
    <Container css={surveyStyles} maxWidth="lg" sx={{ my: 4 }} {...props}>
      <Typography variant="h2" mb={4}>
        {Name}
      </Typography>
      <Typography variant="body1">{Description}</Typography>
      <br />
      {surveyId === "1" && (
        <>
          <Typography>This survey has four sections:</Typography>
          <br />
          {questionText.header.legend.map((row) => (
            <Typography key={row} fontWeight={700}>
              {row}
            </Typography>
          ))}
          <br />
          <Typography fontWeight={700}>
            {questionText.header.description}
          </Typography>
        </>
      )}
      <hr />
      {surveyId === "1" && (
        <>
          <Typography variant="h4">{questionText.sections[1].title}</Typography>
          <Typography variant="body1">
            {questionText.sections[1].description}
          </Typography>
        </>
      )}
      <br />
      {/* This is also gross 🤮 */}
      <SelectQuestion
        qNumber={"1"}
        label={`${questionsArray[0][0]}. ${questionsArray[0][1].Text}`}
        choices={questionsArray[0][1].Choices}
      />
      {questionsArray.slice(1, 11).map(([qNumber, { Choices, Text }], i) => (
        <RadioQuestion
          key={qNumber}
          qNumber={qNumber}
          direction="column"
          label={`${qNumber}. ${Text}`}
          choices={Choices}
        />
      ))}
      {surveyId === "1" && (
        <>
          <hr />
          <Typography variant="h4">{questionText.sections[2].title}</Typography>
          <Typography variant="body1">
            {questionText.sections[2].description[0]}
          </Typography>
          <Typography variant="body1" fontWeight={700}>
            {questionText.sections[2].description[1]}
          </Typography>
          <br />
          {questionsArray
            .slice(11, 94) // TODO: MAGIC NUMBERS BAD
            .map(([qNumber, { Choices, Text }], i) => (
              <RadioQuestion
                key={qNumber}
                qNumber={qNumber}
                label={`${qNumber}. ${Text}`}
                choices={Choices}
              />
            ))}
        </>
      )}
      <br />
      <div className="submit-button">
        <Button onClick={submissionAdapter} variant="contained" size="large">
          <Typography variant="h6">Submit Survey</Typography>
        </Button>
      </div>
    </Container>
  );
};

export default UserSurvey;
