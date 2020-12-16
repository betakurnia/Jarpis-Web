import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";

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
  });

  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item xs={0.5}>
          <Typography
            variant="body1"
            component="p"
            style={{ textAlign: "center" }}
          >
            {i} .{" "}
          </Typography>
        </Grid>
        <Grid item xs={11}>
          <Typography variant="body1" component="p">
            {title}
          </Typography>
        </Grid>
        <FormLabel component="legend" style={{ marginTop: "2rem" }}></FormLabel>
        <RadioGroup
          value={value}
          onChange={(e) => {
            handleChange(e, i - 1);
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
