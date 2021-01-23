import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";

import color from "../../../utils/color";

function SimpleTable({ dataColumnHeaders, children }) {
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
      marginTop: "3rem",
    },
    table: {
      minWidth: 650,
    },
    blue: {
      backgroundColor: color.lightBlack,
      padding: "0.5rem 1rem",
      color: color.white,
      borderRadius: "0.5rem",
    },
    bgPrimary: {
      backgroundColor: color.lightBlack,
    },
    tableRow: {
      "& > *": {
        color: color.white,
      },
    },
  });

  const classes = useStyles();

  const tableHeaders = dataColumnHeaders.map((column) => (
    <TableCell>{column}</TableCell>
  ));

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.bgPrimary}>
          <TableRow className={classes.tableRow}>{tableHeaders}</TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(SimpleTable);
