import { css, Theme } from "@emotion/react";
import { TextField, TextFieldProps } from "@mui/material";

const inputStyles = (theme: Theme) => css`
  .MuiTextField-root {
    .MuiInputLabel-shrink {
      transform: translateY(44px) scale(1.2);
      font-weight: 700;
      color: black;
    }
    .MuiOutlinedInput-root {
      .MuiOutlinedInput-notchedOutline {
        border-width: 3px;
        legend {
          position: absolute;
          bottom: 0;
          height: 3px;
          text-align: right;
        }
      }
    }
    .MuiInputLabel-root {
        line-height: 1;
        padding: 0 10px;
      background: white;
      &.Mui-focused {
        background: white;
      }
    }
  }
`;

export const CustomInput: React.FC<TextFieldProps> = (props) => {
  return (
    <div css={inputStyles}>
      <TextField
        {...props}
        fullWidth
        InputProps={props.InputProps}
        variant={"outlined" as any}
      />
    </div>
  );
};
