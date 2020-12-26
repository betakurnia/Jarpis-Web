import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
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
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { connect } from "react-redux";
import clsx from "clsx";

import Badge from "../../atoms/Badge";

import proxy from "../../../utils/proxy";
import isEmpty from "../../../utils/is-empty";
import color from "../../../utils/color";

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
    textWhite: {
      color: color.white,
    },
    bgPrimary: {
      backgroundColor: color.primary,
    },
  });

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

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
    status: "Hadir",
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

  const [undoneArray, setUndoneArray] = React.useState([]);

  let i = 0;

  React.useEffect(() => {
    present["userId"] = user.user.id;
    present["majorId"] = id;
    setPresent({ ...present });

    axios
      .get(`${proxy}/api/presents/view/${user.user.id}/${id}`)
      .then((res) => {
        setPresents({ ...res.data });
        if (!isEmpty(res.data)) {
          setUndoneArray([...new Array(14 - res.data.status.length)]);
        } else {
          setUndoneArray([...new Array(14)]);
        }
      })
      .catch((err) => console.log(err));
  }, [id, present, user.user.id]);

  return (
    <TableContainer component={Paper} style={{ marginTop: "3rem" }}>
      <Table className={clsx(classes.table)} aria-label="simple table">
        <TableHead className={classes.blue}>
          <TableRow>
            <TableCell className={classes.textWhite}>Tanggal</TableCell>
            <TableCell className={classes.textWhite}>Deskripsi</TableCell>
            <TableCell className={classes.textWhite}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isEmpty(presents.status) &&
            presents.status.map((status) => (
              <TableRow key={status}>
                <TableCell>
                  {" "}
                  <p>
                    {dateFormat(
                      i * 604800000 + Date.parse(major.hoursOfSubject),
                      "mmmm d, yyyy "
                    )}
                  </p>
                  <p style={{ lineHeight: 0.5 }} test={i++}>
                    {dateFormat(major.hoursOfSubject, "dddd hh:MM TT")} -{" "}
                    {dateFormat(major.hoursOfSubjectFinish, "hh:MM TT")}
                  </p>
                </TableCell>
                <TableCell style={{ color: "#9e9e9e" }}>
                  Absen sudah ditutup
                </TableCell>
                <TableCell>
                  <Badge status={status} />
                </TableCell>
              </TableRow>
            ))}
          {undoneArray.map((undone, index) => (
            <TableRow key={undone}>
              <TableCell>
                {" "}
                <p>
                  {dateFormat(
                    i * 604800000 + Date.parse(major.hoursOfSubject),
                    "mmmm d, yyyy "
                  )}
                </p>
                <p style={{ lineHeight: 0.5 }} test={i++}>
                  {dateFormat(major.hoursOfSubject, "dddd hh:MM TT")} -{" "}
                  {dateFormat(major.hoursOfSubjectFinish, "hh:MM TT")}
                </p>
              </TableCell>
              {Date.parse(new Date()) >
              (i - 1) * 604800000 + Date.parse(major.hoursOfSubject) ? (
                <TableCell
                  onClick={handleClickOpen}
                  style={{ cursor: "pointer" }}
                >
                  Absen disini
                </TableCell>
              ) : (
                <TableCell style={{ color: "#9e9e9e" }}>
                  Absen belum tersedia
                </TableCell>
              )}

              <TableCell>
                <span className={classes.blue}>Belum absen</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ minWidth: 480 }}>
          <DialogTitle id="alert-dialog-title">
            <Typography variant="h5" component="h2" style={{ fontWeight: 500 }}>
              Kehadiran
            </Typography>
          </DialogTitle>
          <DialogContentText id="alert-dialog-description">
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={present.status}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Hadir"
                  control={<Radio />}
                  label="Hadir"
                />
                <FormControlLabel
                  value="Sakit"
                  control={<Radio />}
                  label="Sakit"
                />
                <FormControlLabel
                  value="Tidak Hadir"
                  control={<Radio />}
                  label="Tidak hadir"
                />
              </RadioGroup>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            style={{ color: "#dc3545" }}
          >
            Batal
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            color="primary"
            autoFocus
            style={{ backgroundColor: "#008000", color: "#ffffff" }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(BasicTable);
