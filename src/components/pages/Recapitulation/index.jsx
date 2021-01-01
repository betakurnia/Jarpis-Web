import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
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
    backgroundColor: "#3f51b5",
    padding: "0.5rem 1rem",
    color: color.white,
    borderRadius: "0.5rem",
  },
});

function BasicTable({ id, user, major }) {
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

  const [present, setPresent] = React.useState({
    userId: "",
    majorId: "",
    status: "hadir",
  });

  React.useEffect(() => {
    present["userId"] = user.user.id;
    present["majorId"] = id;
    setPresent({ ...present });

    axios
      .get(`${proxy}/api/users/view`)
      .then((res) => {
        setRecapitulation([...res.data]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <TableContainer component={Paper} style={{ marginTop: "3rem" }}>
      <Alert severity="warning">
        Dapat mengikuti ujian ketika kehadiran lebih dari 8
      </Alert>
      <Table
        className={classes.table}
        aria-label="simple table"
        style={{ marginTop: "2rem" }}
      >
        <TableHead style={{ backgroundColor: color.primary }}>
          <TableRow>
            <TableCell style={{ color: color.white }}>Siswa</TableCell>
            <TableCell style={{ color: color.white }}>Mata Pelajaran</TableCell>
            <TableCell style={{ color: color.white }}>
              Total Kehadiran
            </TableCell>
            <TableCell style={{ color: color.white }}>
              Dapat Mengikuti Ujian
            </TableCell>
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
                <TableCell>{recapitulatio.majorId.majorName}</TableCell>
                <TableCell>
                  <p>
                    <p>{recapitulatio.status.length} / 14</p>
                  </p>
                </TableCell>
                <TableCell>
                  <p>
                    {recapitulatio.status.length > 7 ? (
                      <span
                        style={{
                          backgroundColor: "#dc3545",
                          padding: "0.5rem 1rem",
                          color: "green",
                          borderRadius: "0.5rem",
                        }}
                      >
                        Diizinkan
                      </span>
                    ) : (
                      <span
                        style={{
                          backgroundColor: "#dc3545",
                          padding: "0.5rem 1rem",
                          color: "#ffffff",
                          borderRadius: "0.5rem",
                        }}
                      >
                        Tidak
                      </span>
                    )}
                  </p>
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

export default connect(mapStateToProps)(BasicTable);
