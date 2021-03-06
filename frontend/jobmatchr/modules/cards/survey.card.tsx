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

  .chip-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
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
  Description: string;
  Name: string;
};
export const SurveyCard: React.FC<Props> = ({
  Description,
  Name,
  ...props
}) => {
  return (
    <div css={cardStyles}>
      <Typography variant="body1" fontWeight={700} className="title">{Name}</Typography>
      <Typography variant="body1" mb={2} className="description">
        {Description}
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
