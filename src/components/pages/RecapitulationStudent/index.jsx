import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { connect } from "react-redux";
import axios from "axios";

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
  bgPrimary: {
    backgroundColor: color.primary,
  },
  tRow: {
    "& > *": {
      color: color.white,
    },
  },
  info: {
    backgroundColor: color.info,
    padding: "0.5rem 1rem",
    color: color.white,
    borderRadius: "0.5rem",
  },
  danger: {
    backgroundColor: color.danger,
    padding: "0.5rem 1rem",
    color: color.white,
    borderRadius: "0.5rem",
  },
});

function RecapitulationStudent({ user, major }) {
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

  const [recapitulations, setRecapitulation] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${proxy}/api/exams/view/recapitulations/${user.isAuthenticated.id}`)
      .then((res) => {
        setRecapitulation([...res.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <TableContainer component={Paper} style={{ marginTop: "3rem" }}>
      <Table
        className={classes.table}
        aria-label="simple table"
        style={{ marginTop: "2rem" }}
        className={classes.bgPrimary}
      >
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell>Siswa</TableCell>
            <TableCell>Nilai</TableCell>
            <TableCell>Mata Pelajaran</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isEmpty(recapitulations) &&
            recapitulations.map((recapitulation) => (
              <TableRow key={recapitulation}>
                <TableCell> {recapitulation.userId.name}</TableCell>

                <TableCell>{recapitulation.type.split("-")[0]}</TableCell>
                <TableCell>{recapitulation.majorId.majorName}</TableCell>
                <TableCell>
                  {recapitulation.result > 70 ? (
                    <TableCell className={classes.info}>
                      {recapitulation.type}
                    </TableCell>
                  ) : (
                    <TableCell className={classes.danger}>
                      {recapitulation.result}
                    </TableCell>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(RecapitulationStudent);
