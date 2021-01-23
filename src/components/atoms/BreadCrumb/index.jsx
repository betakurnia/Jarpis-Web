import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import makeStyles from "@material-ui/styles/makeStyles";
import { Link } from "react-router-dom";

import color from "../../../utils/color";

export default function SimpleBreadcrumbs() {
  const useStyles = makeStyles({
    root: {
      marginBottom: "3rem",
    },
    current: {
      color: color.primary,
    },
    dashboard: {
      color: color.black,
    },
  });

  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb" className={classes.root} separator=">">
      <Link to="/">
        <Typography variant="body1" component="p" className={classes.dashboard}>
          Dashboard
        </Typography>
      </Link>
      <Typography variant="h6" component="p" className={classes.current}>
        Mata Pelajaran
      </Typography>
    </Breadcrumbs>
  );
}
