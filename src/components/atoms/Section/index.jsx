import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

import color from "../../../utils/color";

function ExamSection({ description, icon, title, id, isStudent }) {
  const useStyles = makeStyles({
    icon: {
      width: "100%",
    },
    link: {
      cursor: "pointer",
    },
    description: {
      color: color.grey,
    },
  });

  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid item xs={4} md={2}>
        <span className={classes.icon}> {icon}</span>
      </Grid>
      <Grid item xs={8} md={10}>
        {isStudent ? (
          <Link to={`/mata-pelajaran/presensi/${id}`}>
            <Typography variant="h6" component="p">
              {title}
            </Typography>
          </Link>
        ) : (
          <React.Fragment>
            <Typography variant="h6" component="p">
              {title}
            </Typography>
          </React.Fragment>
        )}

        <Typography
          variant="body1"
          component="p"
          className={classes.description}
        >
          {description}
        </Typography>
      </Grid>
    </React.Fragment>
  );
}

export default ExamSection;
