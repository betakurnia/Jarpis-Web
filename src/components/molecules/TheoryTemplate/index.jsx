import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

function TheoryTemplate({ title, children, icon }) {
  const useStyles = makeStyles({
    root: {
      padding: "2rem 0",
      borderBottom: `0.05px solid #bdbdbd`,
      textTransform: "capitalize",
    },
  });

  const classses = useStyles();

  return (
    <div className={classses.root}>
      <Grid container alignItems="flex-end">
        <div style={{ paddingRight: "0.5rem" }}>{icon}</div>
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
