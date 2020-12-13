import React from "react";
import { Grid, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

function Section({ description, icon, title, isLink, id, isStudent }) {
  const useStyles = makeStyles({
    icon: {
      width: "100%",
    },
    link: {
      cursor: "pointer",
    },
    description: {
      color: "#424242",
    },
  });

  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid item xs={2}>
        <span className={classes.icon}> {icon}</span>
      </Grid>
      <Grid item xs={10}>
        {isLink ? (
          <React.Fragment>
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
          </React.Fragment>
        ) : (
          <Typography variant="h6" component="p">
            {title}
          </Typography>
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

export default Section;
