import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

function Section({ description, icon, title, isLink }) {
  const useStyles = makeStyles({
    icon: {
      width: "100%",
    },
  });

  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid item xs={3}>
        {icon}
      </Grid>
      <Grid item xs={9}>
        {isLink ? (
          <Link to="/presensi">
            <Typography variant="h6" component="p">
              {title}
            </Typography>
          </Link>
        ) : (
          <Typography variant="h6" component="p">
            {title}
          </Typography>
        )}

        <Typography variant="body1" component="p">
          {description}
        </Typography>
      </Grid>
    </React.Fragment>
  );
}

export default Section;
