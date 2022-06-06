import { css, Theme } from "@emotion/react";
import { Typography } from "@mui/material";
import { CategoryChip } from "../chips/category.chip";

const cardStyles = (theme: Theme) => css`
  border-radius: 8px;
  border: 2px solid black;
  padding: ${theme.spacing(2)};

  .chip-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`;

type Props = React.HTMLAttributes<HTMLDivElement> & {
  // additional props here
};
export const SurveyCard: React.FC<Props> = ({ ...props }) => {
  return (
    <div css={cardStyles}>
      <Typography variant="h6">Survey Title</Typography>
      <Typography variant="body1" mb={4}>
        Survey Description Text - This section will encompass some description
        about what exactly this survey will be asking and for what category
      </Typography>
      <div className="chip-container">
        <CategoryChip text="Stem" />
        <CategoryChip text="Medical" />
        <CategoryChip text="Biology" />
        <Typography
          variant="body1"
          my={1}
          component="div"
          whiteSpace={"nowrap"}
          flex={0}
        >
          <em>10 mins</em>
        </Typography>
      </div>
    </div>
  );
};
