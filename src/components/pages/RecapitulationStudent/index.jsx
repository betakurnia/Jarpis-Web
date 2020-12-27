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
});

function BasicTable({ user, major }) {
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

  const [recapitulation, setRecapitulation] = React.useState([]);

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
      >
        <TableHead style={{ backgroundColor: color.primary }}>
          <TableRow>
            <TableCell style={{ color: color.white }}>Siswa</TableCell>
            <TableCell style={{ color: color.white }}>Nilai</TableCell>
            <TableCell style={{ color: color.white }}>Mata Pelajaran</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isEmpty(recapitulation) &&
            recapitulation.map((recapitulatio) => (
              <TableRow key={recapitulatio}>
                <TableCell>
                  {" "}
                  <p>{recapitulatio.userId.name}</p>
                </TableCell>
                <TableCell>
                  {recapitulatio.result > 70 ? (
                    <TableCell
                      style={{
                        backgroundColor: "green",
                        padding: "0.5rem 1rem",
                        color: "#ffffff",
                        borderRadius: "0.5rem",
                      }}
                    >
                      {recapitulatio.result}
                    </TableCell>
                  ) : (
                    <TableCell
                      style={{
                        backgroundColor: "#dc3545",
                        padding: "0.5rem 1rem",
                        color: "#ffffff",
                        borderRadius: "0.5rem",
                      }}
                    >
                      {recapitulatio.result}
                    </TableCell>
                  )}
                </TableCell>
                <TableCell>{recapitulatio.majorId.majorName}</TableCell>
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

export default connect(mapStateToProps)(BasicTable);
