import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

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
  tableRow: {
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

function RecapitulationValue({ user, major }) {
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

  const { ujian, id } = useParams();

  const [recapitulations, setRecapitulations] = React.useState([]);

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
      .get(`${proxy}/api/exams/view/recapitulation/${id}?type=${ujian}`)
      .then((res) => {
        setRecapitulations([...res.data]);
      })
      .catch((err) => console.log(err));
  }, [id, ujian]);

  return (
    <TableContainer component={Paper} style={{ marginTop: "3rem" }}>
      <Table
        className={classes.table}
        aria-label="simple table"
        style={{ marginTop: "2rem" }}
      >
        <TableHead className={classes.bgPrimary}>
          <TableRow className={classes.tableRow}>
            <TableCell>Siswa</TableCell>
            <TableCell>Mata Pelajaran</TableCell>
            <TableCell>Nilai</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isEmpty(recapitulations) &&
            recapitulations.map((recapitulation) => (
              <TableRow key={recapitulation}>
                <TableCell> {recapitulation.userId.name}</TableCell>
                <TableCell>{recapitulation.majorId.majorName}</TableCell>
                <TableCell>
                  {recapitulation.result > 70 ? (
                    <TableCell className={classes.info}>
                      {recapitulation.result}
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

export default connect(mapStateToProps)(RecapitulationValue);
