import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";

function TheoryTemplate({ title, children, icon }) {
  const useStyles = makeStyles({
    root: {
      padding: "2rem 0",
      borderBottom: `0.05px solid #bdbdbd`,
      textTransform: "capitalize",
    },
    icon: {
      paddingRight: "0.5rem",
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container alignItems="flex-end">
        <div className={classes.icon}>{icon}</div>
        <Typography variant="h6" component="h2">
          {" "}
          {title}
        </Typography>
      </Grid>
      {children}
    </div>
  );
}

export default TheoryTemplate;
