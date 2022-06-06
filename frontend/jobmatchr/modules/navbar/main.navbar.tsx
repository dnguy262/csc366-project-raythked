import { css, Theme, useTheme } from "@emotion/react";
import { Grid, List, ListItem, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
const navbarStyles = (currentPage: string, theme: Theme) => css`
  margin: ${theme.spacing(2, 0)};
  .MuiList-root {
    flex-wrap: wrap;
    display: flex;
    justify-content: flex-end;
    flex: 1 1 auto;
    > li {
      max-width: fit-content;
      white-space: nowrap;
      transition: all 0.3s;
      cursor: pointer;
      text-decoration-color: white;
      &.${currentPage} {
        text-decoration: solid underline ${theme.spacing(0.5)};
        text-decoration-color: ${theme.palette.secondary.main};
        text-underline-offset: ${theme.spacing(1)};
        transform: translateY(-${theme.spacing(0.25)});
      }
      &:hover {
        text-decoration: underline;
        text-decoration-thickness: ${theme.spacing(0.5)};
        text-decoration-color: ${theme.palette.secondary.main};
        text-underline-offset: ${theme.spacing(1)};
        transform: translateY(-${theme.spacing(0.25)});
      }
    }
  }
`;

type Props = React.HTMLAttributes<HTMLDivElement> & {
  currentPage: string;
};
export const Navbar: React.FC<Props> = ({ currentPage, ...props }) => {
  const theme = useTheme();
  return (
    <Grid container css={() => navbarStyles(currentPage, theme)}>
      <Grid item xs={12} textAlign="right">
        <Typography variant="h5">
          Anonymous <AccountCircleIcon fontSize="large" sx={{ mb: -1 }} />
        </Typography>
      </Grid>
      <Grid item xs={12} display="flex" flexWrap="wrap" alignItems={"baseline"}>
        <Typography variant="h2" display="inline" mr={2}>
          JobMatchr
        </Typography>
        <List dense>
          <Link passHref href="/surveys">
            <ListItem className="surveys">
              <Typography variant="h5">Surveys</Typography>
            </ListItem>
          </Link>
          <Link passHref href="/submissions">
            <ListItem className="submissions">
              <Typography variant="h5">Submissions</Typography>
            </ListItem>
          </Link>

          <Link passHref href="/create-profile">
            <ListItem className="create-profile">
              <Typography variant="h5">Create Profile</Typography>
            </ListItem>
          </Link>
          <Link passHref href="/desired-profiles">
            <ListItem className="desired-profiles">
              <Typography variant="h5">Desired Profiles</Typography>
            </ListItem>
          </Link>
          <Link passHref href="/recommendations">
            <ListItem className="recommendations">
              <Typography variant="h5">Recommendations</Typography>
            </ListItem>
          </Link>
          <Link passHref href="/job-list">
            <ListItem className="job-list">
              <Typography variant="h5">Job List</Typography>
            </ListItem>
          </Link>
        </List>
      </Grid>
    </Grid>
  );
};
