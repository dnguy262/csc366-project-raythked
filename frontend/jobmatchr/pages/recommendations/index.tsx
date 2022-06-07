<<<<<<< HEAD
import { Typography } from "@mui/material";
import { NextPage } from "next/types";
import { MatchrPage } from "../../modules/layout";

const Recommendations: NextPage = () => {
  return (
    <MatchrPage>
      <Typography variant="h1">Recommendations</Typography>
    </MatchrPage>
  );
};

export default Recommendations;
=======
import { Grid, Typography } from "@mui/material";
import { NextPage } from "next/types";
import { useEffect, useState } from "react";
import { LOCAL_STORAGE_TOKEN } from "../../modules/constants/local-storage.constant";
import { MatchrPage } from "../../modules/layout";
import { Loading } from "../../modules/loading";
import { useLocalStorage } from "../../modules/providers/window.provider";
import { Recommendation } from "../../modules/surveys/types/recommendation.interface";
import { css } from "@emotion/react";
import { JobCard } from "../../modules/cards/job.card";
import Link from "next/link";

const Recommendations: NextPage = () => {
  const localStorage = useLocalStorage();
  const [ loading, setLoading ] = useState(true);
  const [recommendations, setRecommendations] = useState<Array<Recommendation>>([]);

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_TOKEN);
    if (data) {
      setRecommendations(JSON.parse(data as string));
    } else {
      setLoading(false);
    }
  }, [localStorage]);

  return (
    <MatchrPage>
      <Typography variant="h1" mb={4}>
        Recommendations
      </Typography>
      <Grid container spacing={4}>
        {recommendations.length > 0 ? (
          recommendations.map((recommendation) => 
          <Link passHref href={`https://www.onetonline.org/link/summary/${recommendation.job_code}`} target="_blank">
            <Grid item xs={6} md={4} lg={3}>
              <JobCard {...recommendation}/>
            </Grid>
          </Link>)
        ) : loading ? (
          <Loading
            css={(theme) =>
              css`
                margin-top: ${theme.spacing(8)};
              `
            }
          />
        ) : <Typography variant="h2" fontWeight={300}>No Recommendations found.</Typography>}
      </Grid>
    </MatchrPage>
  );
};

export default Recommendations;
>>>>>>> 33d4940771308b5212db374967b7801889603955
