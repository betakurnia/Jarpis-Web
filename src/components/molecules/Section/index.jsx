import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

import color from "../../../utils/color";

function Section({ description, icon, title, id, isStudent }) {
  const useStyles = makeStyles({
    icon: {
      padding: "1rem",
      backgroundColor: color.white,
    },
    link: {
      cursor: "pointer",
    },
    description: {
      color: color.grey,
    },
    alert: {
      marginBottom: "1.5rem",
    },
  });

  const classes = useStyles();

  const ableExamStudent = isStudent ? (
    <Link to={`/mata-pelajaran/presensi/${id}`}>
      <Typography variant="h6" component="p">
        {title}
      </Typography>
    </Link>
  ) : (
    <Typography variant="h6" component="p">
      {title}
    </Typography>
  );

  const presentWarningNotStudent = !isStudent && (
    <Alert className={classes.alert} severity="warning">
      Presensi hanya tersedia untuk siswa dan guru
    </Alert>
  );

  return (
    <div>
      {presentWarningNotStudent}
      <Grid container spacing={3}>
        <span className={classes.icon}> {icon}</span>
        <div>
          {ableExamStudent}

          <Typography
            variant="body1"
            component="p"
            className={classes.description}
          >
            {description}
          </Typography>
        </div>
      </Grid>
    </div>
  );
}

export default Section;
