import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import { SyncLoader } from "react-spinners";

export const Loading = () => {
    return (<div css={css`
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    `}>
        <Typography variant="h2" mb={4}>Loading Survey</Typography>
        <SyncLoader size={40} margin={20} />
    </div>);
}