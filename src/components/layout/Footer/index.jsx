import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import color from "../../../utils/color";
import size from "../../../utils/size";

function Footer() {
  const useStyles = makeStyles({
    root: {
      padding: "1rem",
      backgroundColor: color.primary,
      marginTop: `${size.big}rem`,
    },
    title: {
      color: color.white,
    },
  });

  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Typography
        variant="body1"
        component="p"
        align="center"
        className={classes.title}
      >
        {" "}
        &copy; Copyright {new Date().getFullYear()} Jarpis
      </Typography>
    </footer>
  );
}

export default Footer;
