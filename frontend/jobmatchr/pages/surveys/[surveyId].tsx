import { css, Theme } from "@emotion/react";
import { Container, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

const surveyStyles = (theme: Theme) => css``;

type Props = React.HTMLAttributes<HTMLDivElement> & {
  // additional props here for stuff from api calls
};
const UserSurvey: NextPage<Props> = () => {
  return (
    <Container css={surveyStyles} maxWidth="xl">
      <Typography variant="h1" textAlign={"center"}>
        Title From Endpoint
      </Typography>
    </Container>
  );
};

export default UserSurvey;
