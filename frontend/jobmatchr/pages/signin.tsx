import { css, Theme } from "@emotion/react";
import { Button, Container, Grid, Typography } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { CustomInput } from "../modules/form/input.form";

const containerStyles = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;

  .MuiButton-root {
    text-transform: capitalize;
    font-weight: 700;
    height: 56px;
    font-size: 1.2rem;
  }

  .grid-container {
    justify-content: center;
  }
`;

const AuthPage: NextPage = () => {
  return (
    <Container css={containerStyles} maxWidth="xl">
      {/* TODO: This page is literally non function UI except for the Anonymous Button */}

      <Grid container className="grid-container">
        <Grid item xs={12}>
          <Typography variant="h1" fontWeight={700}>
            JobMatchr
          </Typography>
          <Typography variant="h2" fontWeight={400} color="GrayText" mb={10}>Career Exploration Database Application</Typography>
        </Grid>
        <Grid
          container
          item
          xs
          sm={6}
          rowSpacing={{ xs: 2, sm: 4 }}
          columnSpacing={2}
        >
          <Grid item xs={12}>
            <CustomInput label="Username" />
          </Grid>
          <Grid item xs={12}>
            <CustomInput label="Password" />
          </Grid>
          <Grid item xs={8}>
            <Link passHref href="/surveys">
              <Button fullWidth variant="contained">
                Anonymous
              </Button>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="outlined"
              css={css`
                border-width: 3px;
              `}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="secondary">
              Create Account
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthPage;
