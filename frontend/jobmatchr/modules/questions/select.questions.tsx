import { memo } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Question } from "../surveys/types/survey.interface";
import { css } from "@emotion/react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  qNumber: string;
  label: string;
  choices: Question["Choices"];
};
export const SelectQuestion = memo(
  ({ qNumber, label, choices, ...props }: Props) => {
    const [choice, setChoice] = useState<string>("");
    return (
      <FormControl fullWidth>
        <div {...props}>
          <Typography variant="body1" color="GrayText">
            {label}
          </Typography>
          <Select
            label="Select an option"
            placeholder="Select an Option"
            defaultValue="Select an Option"
            value={choice}
            inputProps={{ "data-qnumber": qNumber }}
            onChange={(e) => setChoice(e.target.value)}
            css={(theme) =>
              css`
                min-width: 300px;
                margin: ${theme.spacing(2, 0)};
                border: 2px solid black;
                .MuiOutlinedInput-notchedOutline {
                  display: none;
                }
              `
            }
          >
            {Object.entries(choices).map(([choiceId, { Value }]) => (
              <MenuItem key={choiceId} value={choiceId}>
                {Value}
              </MenuItem>
            ))}
          </Select>
        </div>
      </FormControl>
    );
  }
);
