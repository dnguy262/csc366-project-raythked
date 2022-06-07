<<<<<<< HEAD
import { Typography } from "@mui/material";
import { NextPage } from "next/types";
import { MatchrPage } from "../../modules/layout";

const JobList: NextPage = () => {
  return (
    <MatchrPage>
      <Typography variant="h1">Job List</Typography>
    </MatchrPage>
  );
};

export default JobList;
=======
import { Typography } from "@mui/material";
import { NextPage } from "next/types";
import { MatchrPage } from "../../modules/layout";

const JobList: NextPage = () => {
  return (
    <MatchrPage>
      <Typography variant="h1">Job List</Typography>
      <Typography variant="h2" my={4}>Status: Not part of MVP</Typography>
      <Typography variant="h3">
        List of ONET Jobs would show up here. This can allow users to browse
        jobs in the future using a better UI/UX than ONET's current pages.
      </Typography>
    </MatchrPage>
  );
};

export default JobList;
>>>>>>> 33d4940771308b5212db374967b7801889603955
