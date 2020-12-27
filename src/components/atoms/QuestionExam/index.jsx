import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import makeStyles from "@material-ui/styles/makeStyles";

function QuestionExam({
  i,
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
    root: { padding: "1rem" },
    formLabel: { marginTop: "2rem" },
  });

  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item xs={0.5}>
          <Typography variant="body1" component="p" align="center">
            {i} .{" "}
          </Typography>
        </Grid>
        <Grid item xs={11}>
          <Typography variant="body1" component="p">
            {title}
          </Typography>
        </Grid>
        <FormLabel component="legend" className={classes.formLabel}></FormLabel>
        <RadioGroup
          value={value}
          onChange={(e) => {
            if (!answer) {
              handleChange(e, i - 1);
            }
          }}
        >
          <FormControlLabel
            value="a"
            control={<Radio checked={answer === "a"} />}
            label={aAnswer}
          />
          <FormControlLabel
            value="b"
            control={<Radio checked={answer === "b"} />}
            label={bAnswer}
          />
          <FormControlLabel
            value="c"
            control={<Radio checked={answer === "c"} />}
            label={cAnswer}
          />
          <FormControlLabel
            value="d"
            control={<Radio checked={answer === "d"} />}
            label={dAnswer}
          />
        </RadioGroup>
      </Grid>
    </div>
  );
}

export default QuestionExam;
