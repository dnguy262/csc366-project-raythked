import { css, Theme } from "@emotion/react";
import { Typography } from "@mui/material";
import { CategoryChip } from "../chips/category.chip";

const cardStyles = (theme: Theme) => css`
  border-radius: 8px;
  border: 2px solid black;
  padding: ${theme.spacing(2)};
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    transform: scale(1.05);
  }

  .title {
    min-height: 50px;
  }

  .description {
    flex: 1;
    overflow-x: hidden;
    white-space: wrap;
  }
`;

type Props = React.HTMLAttributes<HTMLDivElement> & {
  // additional props here
  job_id: string;
  job_code: string;
  job_name: string;
  job_desc: string;
  cos_similarity: number;
};
export const JobCard: React.FC<Props> = ({ job_id, job_code, job_name, job_desc, cos_similarity, ...props }) => {
  return (
    <div css={cardStyles}>
      <Typography variant="body1" fontWeight={700} className="title">
        {job_name}
      </Typography>
      <Typography variant="body1" mb={2} className="description">
        {job_desc}
      </Typography>
      <Typography textAlign={'right'}><em>Similarity Score:</em> <strong>{cos_similarity}</strong></Typography>
    </div>
  );
};
