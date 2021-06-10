import React, { useState, useEffect } from "react";

import { BadgeExam } from "../../atoms/Badge";
import SimpleTable from "../../atoms/SimpleTable";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Alert from "@material-ui/lab/Alert";
import Pagination from "@material-ui/lab/Pagination";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { connect } from "react-redux";

import color from "../../../utils/color";
import { viewUsers } from "../../../api/";

const dataColumnHeaders = [
  "Siswa",
  "Mata Pelajaran",
  "Total Kehadiran",
  "Dapat Mengikuti Ujian",
];

function Recapitulation({ id, user }) {
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

    async function fetchApi() {
      const users = await viewUsers();
      setRecapitulation([...users]);
    }

    fetchApi();
  }, [id]);

  return (
    <div>
      <Alert severity="warning">
        Dapat mengikuti ujian ketika kehadiran lebih dari 8
      </Alert>
      <SimpleTable dataColumnHeaders={dataColumnHeaders}>
        {tableBodys}
      </SimpleTable>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Recapitulation);
