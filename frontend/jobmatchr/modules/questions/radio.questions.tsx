import { memo } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import { Question } from "../surveys/types/survey.interface";
import { css } from "@emotion/react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  qNumber: string;
  label: string;
  choices: Question["Choices"];
  direction?: "row" | "column";
};
export const RadioQuestion = memo(
  ({ qNumber, label, choices, direction = "row", ...props }: Props) => {
    const [choice, setChoice] = useState<string>("");
    return (
      <FormControl fullWidth>
        <div
          {...props}
          css={(theme) =>
            css`
              margin-bottom: ${theme.spacing(2)};
            `
          }
        >
          <FormLabel id="radio-question">{label}</FormLabel>
          <RadioGroup
            row={direction === "row"}
            aria-labelledby="radio-question"
            name="radio-question"
            value={choice}
            onChange={(e) => setChoice(e.target.value)}
          >
            {Object.entries(choices).map(([choiceId, { Value }]) => (
              <FormControlLabel
                // This is really not the way you should do forms but this is what we got at the moment
                // @ts-ignore
                control={<Radio inputProps={{ 'data-qnumber': qNumber }}/>}
                key={choiceId}
                value={choiceId}
                label={Value}
              />
            ))}
          </RadioGroup>
        </div>
      </FormControl>
    );
  }
);
