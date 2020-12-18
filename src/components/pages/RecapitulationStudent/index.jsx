import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import axios from "axios";
import proxy from "../../../utils/proxy";
import isEmpty from "../../../utils/is-empty";
import color from "../../../utils/color";
import dateformat from "dateformat";
import Badge from "../../atoms/Badge";
import Alert from "@material-ui/lab/Alert";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  blue: {
    backgroundColor: "#3f51b5",
    padding: "0.5rem 1rem",
    color: "#ffffff",
    borderRadius: "0.5rem",
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

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

  const [open, setOpen] = React.useState(false);

  const [recapitulation, setRecapitulation] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [presents, setPresents] = React.useState({
    status: [],
  });

  const [present, setPresent] = React.useState({
    userId: "",
    majorId: "",
    status: "hadir",
  });

  const handleChange = (event) => {
    present["status"] = event.target.value;
    setPresent({ ...present });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);

    axios
      .post(`${proxy}/api/presents/create`, present)
      .then((res) => {
        setPresents({ ...res.data });
      })
      .catch((err) => console.log(err.response.data));
  };

  React.useEffect(() => {
    // present["userId"] = user.user.id;
    // present["majorId"] = id;
    // setPresent({ ...present });

    axios
      .get(`${proxy}/api/exams/view/recapitulations/${user.isAuthenticated.id}`)
      .then((res) => {
        setRecapitulation([...res.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(recapitulation);

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
