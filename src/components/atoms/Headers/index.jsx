import React from "react";

import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";

import color from "../../../utils/color";

function Headers({ title }) {
  const useStyles = makeStyles({
    title: {
      color: color.lightBlack,
      fontWeight: 700,
      marginBottom: "0.75rem",
    },
  });

  const classes = useStyles();

  return (
    <Typography variant="h5" component="h2" className={classes.title}>
      {title}
    </Typography>
  );
}

export default Headers;
