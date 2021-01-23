import React from "react";

import makeStyles from "@material-ui/styles/makeStyles";

function ExamIcon() {
  const useStyles = makeStyles({
    img: {
      width: 120,
      height: 120,
    },
  });

  const classes = useStyles();

  return <img src="/helper/exam.png" alt="exam" className={classes.img} />;
}

export default ExamIcon;
