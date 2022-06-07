<<<<<<< HEAD
import { Typography } from "@mui/material";
import { NextPage } from "next/types";
import { MatchrPage } from "../../modules/layout";

const DesiredProfiles: NextPage = () => {
  return (
    <MatchrPage>
      <Typography variant="h1">Desired Profiles</Typography>
    </MatchrPage>
  );
};

export default DesiredProfiles;
=======
import { Typography } from "@mui/material";
import { NextPage } from "next/types";
import { MatchrPage } from "../../modules/layout";

const DesiredProfiles: NextPage = () => {
  return (
    <MatchrPage>
      <Typography variant="h1">Desired Profiles</Typography>
      <Typography variant="h2" my={4}>Status: Not part of MVP</Typography>
      <Typography variant="h3">
        This would contain the desired profiles that users create for
        characteristics they are most interested in when looking for a career.
      </Typography>
    </MatchrPage>
  );
};

export default DesiredProfiles;
>>>>>>> 33d4940771308b5212db374967b7801889603955
