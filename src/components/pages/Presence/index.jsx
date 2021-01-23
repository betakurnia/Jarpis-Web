import React, { useState, useEffect, Fragment } from "react";

import { BadgeStatus as Badge } from "../../atoms/Badge";
import SimpleTable from "../../atoms/SimpleTable";
import DialogPresence from "../../atoms/DialogPresence";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import { useParams } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import proxy from "../../../utils/proxy";
import isEmpty from "../../../utils/is-empty";
import color from "../../../utils/color";
import { isAvailablePresence } from "../../../utils/format";

function Presence({ user }) {
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
      "Junuari",
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
      "Januari",
      "Februari",
      "Maret",
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
      padding: "2rem",
      boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
    },
    title: {
      fontWeight: 500,
    },
    able: {
      cursor: "pointer",
    },
    disabled: {
      color: color.light,
    },
    date: {
      lineHeight: 0.5,
    },
  });

  const classes = useStyles();

  let [index] = useState(0);

  const { id } = useParams();

  const [open, setOpen] = useState(false);

  const [presents, setPresents] = useState({
    status: [],
  });

  const [present, setPresent] = useState({
    userId: "",
    majorId: "",
    status: "Hadir",
  });

  const [major, setMajor] = useState({});

  const [dataColumnHeaders] = useState(["Tanggal", "Deskripsi", "Status"]);

  const [undoneArray, setUndoneArray] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { value } = e.target;

    present["status"] = value;
    setPresent({ ...present });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);

    axios
      .post(`${proxy}/api/presents/create`, present)
      .then((res) => {
        const { data } = res;

        setPresents({ ...data });
      })
      .catch((err) => console.log(err.response.data));
  };

  const tableBodys = presents.status.map((status) => (
    <TableRow key={status}>
      <TableCell>
        {" "}
        <p>
          {dateFormat(
            index * 604800000 + Date.parse(major.hoursOfSubject),
            "mmmm d, yyyy "
          )}
        </p>
        <p className={classes.date} test={index++}>
          {dateFormat(major.hoursOfSubject, "dddd hh:MM TT")} -{" "}
          {dateFormat(major.hoursOfSubjectFinish, "hh:MM TT")}
        </p>
      </TableCell>
      <TableCell className={classes.disabled}>Absen sudah ditutup</TableCell>
      <TableCell>
        <Badge status={status} />
      </TableCell>
    </TableRow>
  ));

  const tableUndoneBodys = undoneArray.map((undone) => (
    <TableRow key={undone}>
      <TableCell>
        {" "}
        <p>
          {dateFormat(
            index * 604800000 + Date.parse(major.hoursOfSubject),
            "mmmm d, yyyy "
          )}
        </p>
        <p className={classes.date} name={index++}>
          {dateFormat(major.hoursOfSubject, "dddd hh:MM TT")} -{" "}
          {dateFormat(major.hoursOfSubjectFinish, "hh:MM TT")}
        </p>
      </TableCell>
      <Fragment>
        {isAvailablePresence(index, major.hoursOfSubject) ? (
          <TableCell onClick={handleClickOpen} className={classes.able}>
            Absen disini
          </TableCell>
        ) : (
          <TableCell className={classes.disabled}>
            Absen belum tersedia
          </TableCell>
        )}
      </Fragment>
      <TableCell>
        <Badge status="Belum Absen" />
      </TableCell>
    </TableRow>
  ));

  useEffect(() => {
    present["userId"] = user.user.id;
    present["majorId"] = id;
    setPresent({ ...present });

    axios.get(`${proxy}/api/majors/view/${id}`).then((res) => {
      const { data } = res;

      setMajor({ ...data });
    });

    axios
      .get(`${proxy}/api/presents/view/${user.user.id}/${id}`)
      .then((res) => {
        const { data } = res;

        setPresents({ ...data });
        if (!isEmpty(data)) {
          setUndoneArray([...new Array(14 - data.status.length)]);
        }

        if (isEmpty(data)) {
          setUndoneArray([...new Array(14)]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" className={classes.title}>
        Daftar hadir siswa
      </Typography>
      <SimpleTable dataColumnHeaders={dataColumnHeaders}>
        {[...tableBodys, ...tableUndoneBodys]}
      </SimpleTable>
      <DialogPresence
        present={present}
        open={open}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Presence);
