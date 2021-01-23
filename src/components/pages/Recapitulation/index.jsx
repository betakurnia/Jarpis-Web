import React, { useState, useEffect } from "react";

import { BadgeExam } from "../../atoms/Badge";
import SimpleTable from "../../atoms/SimpleTable";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import Pagination from "@material-ui/lab/Pagination";
import makeStyles from "@material-ui/core/styles/makeStyles";
import axios from "axios";
import { connect } from "react-redux";

import proxy from "../../../utils/proxy";
import isEmpty from "../../../utils/is-empty";
import color from "../../../utils/color";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  blue: {
    backgroundColor: color.primary,
    padding: "0.5rem 1rem",
    color: color.white,
    borderRadius: "0.5rem",
  },
  allowed: {
    backgroundColor: color.info,
    padding: "0.5rem 1rem",
    color: color.white,
    borderRadius: "0.5rem",
  },
  notAllow: {
    backgroundColor: color.danger,
    padding: "0.5rem 1rem",
    color: color.white,
    borderRadius: "0.5rem",
  },
  bgPrimary: {
    backgroundColor: color.primary,
  },
  tableRow: {
    "& > *": {
      color: color.white,
    },
  },
  container: {
    marginTop: "3rem",
  },
  pagination: {
    marginTop: "2rem",
    color: color.primary,
  },
});

function Recapitulation({ id, user, major }) {
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

  const classes = useStyles();

  const [recapitulations, setRecapitulation] = useState([]);

  const [dataColumnHeaders] = useState([
    "Siswa",
    "Mata Pelajaran",
    "Total Kehadiran",
    "Dapat Mengikuti Ujian",
  ]);

  const tableBodys = recapitulations.map(({ _id, userId, majorId, status }) => (
    <TableRow key={_id}>
      <TableCell> {userId.name}</TableCell>
      <TableCell>{majorId.majorName}</TableCell>
      <TableCell>{status.length} / 14</TableCell>
      <TableCell>
        <BadgeExam presence={status.length} />
      </TableCell>
    </TableRow>
  ));

  const [present, setPresent] = useState({
    userId: "",
    majorId: "",
    status: "hadir",
  });

  useEffect(() => {
    present["userId"] = user.user.id;
    present["majorId"] = id;
    setPresent({ ...present });

    axios
      .get(`${proxy}/api/users/view`)
      .then((res) => {
        const { data } = res;

        setRecapitulation([...data]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      <Alert severity="warning">
        Dapat mengikuti ujian ketika kehadiran lebih dari 8
      </Alert>
      <SimpleTable dataColumnHeaders={dataColumnHeaders}>
        {tableBodys}
      </SimpleTable>
      <Pagination
        className={classes.pagination}
        count={10}
        variant="outlined"
        color="primary"
        shape="rounded"
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Recapitulation);
