import { Typography } from "@mui/material";
import { NextPage } from "next/types";
import { MatchrPage } from "../../modules/layout";

const CreateProfile: NextPage = () => {
  return (
    <MatchrPage>
      <Typography variant="h1">Create Profile</Typography>;
      <Typography variant="h2">Status: Not part of MVP</Typography>;
      <Typography variant="h3">
        A page where users may create a profile which can be used to login, and
        store additional data in the DB.
      </Typography>
      ;
    </MatchrPage>
  );
};

export default CreateProfile;
