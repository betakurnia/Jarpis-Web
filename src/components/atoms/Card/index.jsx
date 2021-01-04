import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import { Link } from "react-router-dom";

import color from "../../../utils/color";

function Card({ id, title, from, to }) {
  var dateFormat = require("dateformat");
  dateFormat.i18n = {
    dayNames: [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jum'at",
      "Sabtu",
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jum;at",
      "Sabtu",
    ],
    monthNames: [
      "Januari",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "Desember",
    ],
    timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
  };

  const useStyles = makeStyles({
    root: {
      backgroundColor: color.white,
      boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
      padding: "0 2rem 2rem",
    },
    img: {
      maxWidth: "100%",
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
      <Link to={`/mata-pelajaran/${id}`}>
        <div className={classes.root}>
          <img
            className={classes.img}
            alt="education"
            src={"/helper/education.jpg"}
          />
          <Typography variant="h6" component="h2" className={classes.title}>
            {title}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className={classes.description}
          >
            {dateFormat(from, "dddd hh:MM TT")} - {dateFormat(to, "hh:MM TT")}
          </Typography>
        </div>
      </Link>
    </Grid>
  );
}

export default Card;
