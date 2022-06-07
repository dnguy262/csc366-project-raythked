<<<<<<< HEAD
import { Typography } from "@mui/material";
import { NextPage } from "next/types";
import { MatchrPage } from "../../modules/layout";

const CreateProfile: NextPage = () => {
  return (
    <MatchrPage>
      <Typography variant="h1">Create Profile</Typography>;
    </MatchrPage>
  );
};

export default CreateProfile;
=======
import { Typography } from "@mui/material";
import { NextPage } from "next/types";
import { MatchrPage } from "../../modules/layout";

const CreateProfile: NextPage = () => {
  return (
    <MatchrPage>
      <Typography variant="h1">Create Profile</Typography>
      <Typography variant="h2" my={4}>Status: Not part of MVP</Typography>
      <Typography variant="h3">
        A page where users may create a profile which can be used to login, and
        store additional data in the DB.
      </Typography>
      ;
    </MatchrPage>
  );
};

export default CreateProfile;
>>>>>>> 33d4940771308b5212db374967b7801889603955
