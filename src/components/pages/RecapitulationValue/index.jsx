import React, { useState, useEffect } from "react";

import SimpleTable from "../../atoms/SimpleTable";
import { BadgeResult as Badge } from "../../atoms/Badge";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import proxy from "../../../utils/proxy";

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

  const { ujian, id } = useParams();

  const [dataColumnHeaders] = useState(["Siswa", "Mata Pelajaran", "Nilai"]);

  const [recapitulations, setRecapitulations] = useState([]);

  const tableBodys = recapitulations.map(({ userId, majorId, result }) => (
    <TableRow key={userId}>
      <TableCell> {userId.name}</TableCell>
      <TableCell>{majorId.majorName}</TableCell>
      <TableCell>
        <Badge result={result} />
      </TableCell>
    </TableRow>
  ));
  useEffect(() => {
    axios
      .get(`${proxy}/api/exams/view/recapitulation/${id}?type=${ujian}`)
      .then((res) => {
        const { data } = res;

        setRecapitulations([...data]);
      })
      .catch((err) => console.log(err));
  }, [id, ujian]);

  return (
    <SimpleTable dataColumnHeaders={dataColumnHeaders}>
      {tableBodys}
    </SimpleTable>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(RecapitulationValue);
