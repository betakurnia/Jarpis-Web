import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import makeStyles from "@material-ui/styles/makeStyles";

function QuestionExam({
  numberOfQuestion,
  title,
  aAnswer,
  bAnswer,
  cAnswer,
  dAnswer,
  handleChange,
  value,
  answer,
}) {
  const useStyles = makeStyles({
    root: {
      padding: "1rem 0",
      "& > *": {
        display: "inline-block",
      },
    },
    title: {
      paddingLeft: "0.5rem",
    },
    formLabel: { marginTop: "2rem" },
  });

  const classes = useStyles();

  const [formAnswers] = useState([
    {
      label: aAnswer,
      value: "a",
    },
    {
      label: bAnswer,
      value: "b",
    },
    {
      label: cAnswer,
      value: "c",
    },
    {
      label: dAnswer,
      value: "d",
    },
  ]);

  const formFieldAnswers = formAnswers.map(({ label, value }) => (
    <FormControlLabel
      value={value}
      control={<Radio checked={answer === value} />}
      label={label}
    />
  ));

  return (
    <div>
      <div className={classes.root}>
        <Typography variant="body1" component="p">
          {numberOfQuestion} .{" "}
        </Typography>
        <Typography variant="body1" component="p" className={classes.title}>
          {title}
        </Typography>
      </div>
      <Grid container>
        <RadioGroup
          value={value}
          onChange={(e) => {
            if (!answer) {
              handleChange(e, numberOfQuestion - 1);
            }
          }}
        >
          {formFieldAnswers}
        </RadioGroup>
      </Grid>
    </div>
  );
}

export default QuestionExam;
