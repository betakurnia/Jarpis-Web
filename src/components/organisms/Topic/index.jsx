import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Sections from "../../molecules/Sections";
import color from "../../../utils/color";

function Topic() {
  const useStyles = makeStyles({
    root: {
      backgroundColor: color.white,
      padding: "2rem",
      boxShadow: "0 1rem 3rem rgba(0, 0, 0, 0.175) !important",
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Sections />
        <Sections />
        <Sections />
        <Sections />
      </Grid>
    </div>
  );
}

export default Topic;
