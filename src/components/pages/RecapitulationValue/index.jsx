import React, { useState, useEffect } from "react";

import SimpleTable from "../../atoms/SimpleTable";
import { BadgeResult as Badge } from "../../atoms/Badge";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { useParams } from "react-router-dom";

import { viewRecapitulationsByIdAndType } from "../../../api";

function RecapitulationValue() {
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

  async function fetchApi() {
    const recapitulations = await viewRecapitulationsByIdAndType(id, ujian);

    setRecapitulations([...recapitulations]);
  }

  useEffect(() => {
    fetchApi();
  }, [id, ujian]);

  return (
    <SimpleTable dataColumnHeaders={dataColumnHeaders}>
      {tableBodys}
    </SimpleTable>
  );
}

export default RecapitulationValue;
