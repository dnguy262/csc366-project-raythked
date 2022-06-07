import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import { SyncLoader } from "react-spinners";

type Props = React.HTMLAttributes<HTMLDivElement>;
export const Loading = ({ ...props }: Props) => {
  return (
    <div
      css={css`
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      `}
      {...props}
    >
      <Typography variant="h2" mb={2} color="GrayText">
        Loading
      </Typography>
      <SyncLoader size={30} margin={10} color={"#8c8c8c"} />
    </div>
  );
};
