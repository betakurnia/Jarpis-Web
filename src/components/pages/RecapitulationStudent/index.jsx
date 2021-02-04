import React, { useState, useEffect } from "react";

import SimpleTable from "../../atoms/SimpleTable";
import { BadgeResult as Badge } from "../../atoms/Badge";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";

import { viewRecapitulations } from "../../../api";

function RecapitulationStudent({ user }) {
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

  const [recapitulations, setRecapitulation] = useState([]);

  const [dataColumnHeaders] = useState([
    "Siswa",
    "Tipe",
    "Mata Pelajaran",
    "Nilai",
  ]);

  const tableBodys = recapitulations.map(
    ({ userId, majorId, type, result }) => (
      <TableRow key={userId}>
        <TableCell> {userId.name}</TableCell>
        <TableCell>{type.split("-")[0]}</TableCell>
        <TableCell>{majorId.majorName}</TableCell>
        <TableCell>
          <Badge result={result} />
        </TableCell>
      </TableRow>
    )
  );

  useEffect(() => {
    async function fetchApi() {
      const recapitulations = await viewRecapitulations(
        user.isAuthenticated.id
      );

      setRecapitulation([...recapitulations]);
    }
    fetchApi();
  }, []);

  return (
    <SimpleTable dataColumnHeaders={dataColumnHeaders}>
      {tableBodys}
    </SimpleTable>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(RecapitulationStudent);
