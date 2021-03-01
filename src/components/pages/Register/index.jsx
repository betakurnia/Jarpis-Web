import React, { useState, useEffect, Fragment } from "react";

import Grid from "@material-ui/core/Grid";

import Input from "../../atoms/Input";
import Paper from "../../atoms/Paper";
import ErrorSucess from "../../atoms/ErrorSucess";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import InputBase from "@material-ui/core/InputBase";
import makeStyles from "@material-ui/core/styles/makeStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import NativeSelect from "@material-ui/core/NativeSelect";

import color from "../../../utils/color";
import isEmpty from "../../../utils/is-empty";
import { registerUser } from "../../../redux/actions/userAction";
import { clearErrorSucess } from "../../../redux/actions/helperAction";

import proxy from "../../../utils/proxy";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

function Register({ registerUser, error, sucess, clearErrorSucess }) {
  const [roles] = useState([
    { value: "siswa", label: "Siswa" },
    { value: "teacher", label: "Guru" },
    { value: "admin", label: "Admin" },
  ]);

  const [defaultDataForms] = useState([
    {
      id: "username",
      label: "Email",
      placeholder: "contoh: beta@gmail.com",
    },
    {
      id: "password",
      label: "Password",
      placeholder: "*********",
      type: "password",
    },
    {
      id: "name",
      label: "Nama Lengkap",
      placeholder: "contoh: Beta Kurnia",
    },
  ]);

  const [studentDataForms] = useState([
    {
      id: "nis",
      label: "NIS",
      placeholder: "contoh: 1234567890",
    },
    {
      id: "age",
      label: "Umur",
      placeholder: "contoh: 14 tahun",
    },
    { id: "address", label: "Alamat", placeholder: "contoh: Blater" },
    { id: "religion", label: "Agama", placeholder: "contoh: ISLAM" },
  ]);

  const [users, setUser] = useState({
    role: "",
    username: "",
    password: "",
    name: "",
    nis: "",
    age: "",
    address: "",
    religion: "",
    majorId: [],
    kelas: "5fd5a57adec8b90f1f45a7de",
  });

  const [majors, setMajors] = useState([]);

  const [kelass, setClasss] = useState([]);

  const handleChange = (e, name) => {
    if (name === "majorId") {
      if (users.majorId.includes(e.target.value)) {
        users.majorId.filter((major) => {
          return major !== e.target.value;
        });
        setUser({
          ...users,
        });
      } else {
        users.majorId.push(e.target.value);
        setUser({
          ...users,
        });
      }
    } else {
      users[name] = e.target.value;
      setUser({ ...users });
    }
  };

  const handleMenu = (e) => {
    users["role"] = e.target.value;
    setUser({ ...users });
  };

  const useStyles = makeStyles({
    title: {
      color: color.lightBlack,
      fontWeight: "500",
    },
    btn: {
      marginTop: "2rem",
    },
    alert: {
      marginTop: "1.5rem",
    },
    formControl: {
      marginTop: "1.5rem",
    },
    formLabel: {
      marginTop: "2rem",
    },
    label: {
      marginTop: "1.5rem",
      display: "block",
      color: color.label,
      fontSize: "1rem",
    },
  });

  const classes = useStyles();

  const onSubmit = (e) => {
    e.preventDefault();

    registerUser(users);
  };

  const defaultForms = defaultDataForms.map(
    ({ id, label, placeholder, type }) => (
      <Input
        id={id}
        label={label}
        placeholder={placeholder}
        handleChange={handleChange}
        type={type}
      />
    )
  );

  const studentForms =
    users.role === "siswa" &&
    studentDataForms.map(({ id, label, placeholder, isPassword }) => (
      <Input
        id={id}
        label={label}
        placeholder={placeholder}
        handleChange={handleChange}
        isPassword={isPassword}
      />
    ));

  const roleForms = roles.map(({ value, label }) => (
    <FormControlLabel value={value} control={<Radio />} label={label} />
  ));

  useEffect(() => {
    clearErrorSucess();
    axios.get(`${proxy}/api/majors/view`).then((res) => {
      setMajors(res.data);
    });
    axios.get(`${proxy}/api/class/view`).then((res) => {
      setClasss(res.data);
    });
  }, [clearErrorSucess]);

  return (
    <Paper title="Daftar ke Jarpis">
      <form onSubmit={onSubmit}>
        <FormLabel component="legend" className={classes.formLabel}>
          <Typography variant="h5" component="p">
            Role
          </Typography>
        </FormLabel>
        <RadioGroup
          aria-label="role"
          name="Role"
          value={users.role}
          onChange={handleMenu}
          row
        >
          {roleForms}
        </RadioGroup>
        {defaultForms}

        {studentForms}
        {studentForms && (
          <Fragment>
            <label className={classes.label}>Kelas</label>
            <NativeSelect
              id="class"
              style={{ marginTop: "0.5rem" }}
              value={users.kelas}
              onChange={(e) => {
                handleChange(e, "kelas");
              }}
              input={<BootstrapInput />}
              fullWidth
            >
              {kelass.map(({ _id, kelas }) => (
                <option value={_id}>{kelas}</option>
              ))}
            </NativeSelect>
          </Fragment>
        )}

        {users.role === "teacher" && (
          <Fragment>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Mata Pelajaran</FormLabel>
              <FormGroup row>
                {majors.map(({ _id, majorName }) => (
                  <Fragment>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={_id}
                          onChange={(e) => {
                            handleChange(e, "majorId");
                          }}
                          name={majorName}
                        />
                      }
                      label={majorName}
                    />
                  </Fragment>
                ))}
              </FormGroup>
            </FormControl>
            <label className={classes.label}>Kelas</label>
            <NativeSelect
              id="demo-customized-select-native"
              style={{ marginTop: "0.5rem" }}
              value={users.kelas}
              onChange={(e) => {
                handleChange(e, "kelas");
              }}
              input={<BootstrapInput />}
              fullWidth
            >
              {kelass.map(({ _id, kelas }) => (
                <option value={_id}>{kelas}</option>
              ))}
            </NativeSelect>
          </Fragment>
        )}

        <ErrorSucess
          isError={!isEmpty(error)}
          isSucess={Boolean(sucess)}
          sucessMessage="Akun berhasil dibuat"
          errorMessages={[
            error.username,
            error.password,
            error.role,
            error.name,
          ]}
        />
        <Grid container justify="center">
          <Grid item xs={12} md={4}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              className={classes.btn}
            >
              Daftar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  error: state.error,
  sucess: state.sucess,
});

export default withRouter(
  connect(mapStateToProps, { registerUser, clearErrorSucess })(Register)
);
