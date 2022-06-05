import { css, Theme, useTheme } from "@emotion/react";
import { Typography } from "@mui/material";

const chipStyles = (color: string | undefined, theme: Theme) => css`
  border-radius: 50px;
  color: #fff;
  height: fit-content;
  padding: ${theme.spacing(0.25, 1)};
  margin-right: ${theme.spacing(1)};
  background: ${color ? `rgba(${color}, 0.7)` : theme.palette.secondary.light};
`;

type Props = React.HTMLAttributes<HTMLDivElement> & {
  // additional props here
  text: string;
  color?: string;
};
export const CategoryChip: React.FC<Props> = ({ text, color, ...props }) => {
  const theme = useTheme();
  return (
    <span css={chipStyles(color, theme)}>
      <Typography variant="body2" component="span" fontWeight={600}>
        {text}
      </Typography>
    </span>
  );
};
