import React, { useState, useEffect, useRef, Fragment } from "react";

import BreadCrumb from "../../atoms/BreadCrumb";
import Sections from "../../organisms/Sections";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import color from "../../../utils/color";
import isEmpty from "../../../utils/is-empty";
import { viewMajors } from "../../../api";

function Major({ user }) {
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

  const headerDOM = useRef(null);

  const useStyles = makeStyles({
    root: {
      backgroundColor: color.white,
      padding: "2rem",
      boxShadow: "0 1rem 3rem rgba(0, 0, 0, 0.175) ",
    },
    header: {
      color: color.white,
      padding: "1rem 2rem",
    },
    title: {
      fontWeight: 500,
    },
    img: {
      height: 54,
      width: 54,
    },
    box: {
      paddingLeft: "1.5rem",
    },
  });

  const classes = useStyles();

  const { id } = useParams();

  const [major, setMajor] = useState({});

  const { majorName, imageName, hoursOfSubject, hoursOfSubjectFinish } = major;

  const { role } = user.isAuthenticated;

  useEffect(() => {
    async function fetchApi() {
      const majors = await viewMajors(id);

      if (majors) {
        headerDOM.current.style.backgroundColor = majors.color;
      }

      setMajor({ ...majors });
    }

    fetchApi();
  }, [id]);

  const header = !isEmpty(major) && (
    <Fragment>
      <Grid container alignItems="center">
        <img
          className={classes.img}
          alt="education"
          src={`/majors/${imageName}`}
        />
        <div className={classes.box}>
          <Typography variant="h4" component="h1" className={classes.title}>
            {majorName}
          </Typography>
          <Typography variant="body" component="p" className={classes.title}>
            {dateFormat(hoursOfSubject, "dddd hh:MM TT")} -{" "}
            {dateFormat(hoursOfSubjectFinish, "hh:MM TT")}
          </Typography>
        </div>
      </Grid>
    </Fragment>
  );

  return (
    <div>
      {" "}
      <BreadCrumb />
      <div className={classes.header} ref={headerDOM}>
        {header}
      </div>
      <div className={classes.root}>
        <Sections
          id={id}
          isStudent={role === "siswa"}
          isTeacher={role === "teacher"}
          majorName={majorName}
        />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Major);
