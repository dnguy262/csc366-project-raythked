import { Typography } from "@mui/material";
import { NextPage } from "next/types";
import { MatchrPage } from "../../modules/layout";

const Recommendations: NextPage = () => {
  return (
    <MatchrPage>
      <Typography variant="h1">Recommendations</Typography>
      <Typography variant="h3">
        This page displays the recommendations based on the most recent survey
        taken and the results returned from the recommendation engine in the
        backend.
      </Typography>
    </MatchrPage>
  );
};

export default Recommendations;
