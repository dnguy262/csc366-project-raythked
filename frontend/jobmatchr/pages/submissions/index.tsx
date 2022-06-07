<<<<<<< HEAD
import { Typography } from "@mui/material";
import { NextPage } from "next/types";
import { MatchrPage } from "../../modules/layout";

const Submissions: NextPage = () => {
  return (
    <MatchrPage>
      <Typography variant="h1">Submissions</Typography>
    </MatchrPage>
  );
};

export default Submissions;
=======
import { Typography } from "@mui/material";
import { NextPage } from "next/types";
import { MatchrPage } from "../../modules/layout";

const Submissions: NextPage = () => {
  return (
    <MatchrPage>
      <Typography variant="h1">Submissions</Typography>
      <Typography variant="h2" my={4}>Status: Not part of MVP</Typography>
      <Typography variant="h3">
        A page for viewing a user's past submissions. Note: since we are working
        on anonymous we were thinking about displaying data from local storage
        to be shown here but it is low on the priority list.
      </Typography>
    </MatchrPage>
  );
};

export default Submissions;
>>>>>>> 33d4940771308b5212db374967b7801889603955
