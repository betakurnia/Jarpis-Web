import React, { Fragment } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";

import color from "../../../utils/color";

function Header({ title }) {
  const useStyles = makeStyles({
    root: {
      marginBottom: "0.5rem",
    },
    title: {
      color: color.lightBlack,
      fontWeight: 600,
      marginLeft: "0.75rem",
    },
  });

  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.root}>
        <Grid container alignItems="center">
          <Typography variant="h5" component="h2" className={classes.title}>
            {title}
          </Typography>
        </Grid>
      </div>
    </Fragment>
  );
}

export default Header;
