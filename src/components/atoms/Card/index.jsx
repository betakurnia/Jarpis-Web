import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import { Link } from "react-router-dom";

function Card({
  id,
  title,
  from,
  to,
  imageName = "science.png",
  color = "red",
}) {
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
      "Jum'at",
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
      boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
    },
    img: {
      maxWidth: "90%",
      height: "200px",
    },
    description: {
      marginTop: "0.5rem",
    },
    imgBox: {
      textAlign: "center",
      padding: "2rem",
    },
    descriptionBox: {
      backgroundColor: color,
      color: "white",
      padding: "2rem",
    },
  });

  const classes = useStyles();

  return (
    <Grid item xs={6} sm={4} md={3}>
      <Link to={`/mata-pelajaran/${id}`}>
        <div className={classes.root}>
          <div className={classes.imgBox}>
            <img
              className={classes.img}
              alt="education"
              src={`/majors/${imageName}`}
            />
          </div>
          <div className={classes.descriptionBox}>
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
        </div>
      </Link>
    </Grid>
  );
}

export default Card;
