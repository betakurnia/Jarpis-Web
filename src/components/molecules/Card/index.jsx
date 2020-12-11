import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import color from "../../../utils/color";
import { Link } from "react-router-dom";

function Card({ title, description }) {
  const useStyles = makeStyles({
    root: {
      backgroundColor: color.white,
      boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
      padding: "0 2rem 2rem",
    },
    img: {
      width: "100%",
      height: "auto",
    },
    title: {
      marginTop: "2rem",
    },
    description: {
      marginTop: "0.5rem",
    },
  });

  const classes = useStyles();

  return (
    <Grid item xs={6} sm={4} md={3}>
      <Link to="/mata-pelajaran/abc">
        <div className={classes.root}>
          <img className={classes.img} alt="" />
          <Typography variant="h6" component="h2" className={classes.title}>
            {title}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className={classes.description}
          >
            {description}
          </Typography>
        </div>
      </Link>
    </Grid>
  );
}

export default Card;
