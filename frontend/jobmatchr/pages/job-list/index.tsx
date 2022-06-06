import { Typography } from "@mui/material";
import { NextPage } from "next/types";
import { MatchrPage } from "../../modules/layout";

const JobList: NextPage = () => {
  return (
    <MatchrPage>
      <Typography variant="h1">Job List</Typography>
      <Typography variant="h2">Status: Not part of MVP</Typography>
      <Typography variant="h3">Job List</Typography>
    </MatchrPage>
  );
};

export default JobList;
