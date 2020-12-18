import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Input from "../../atoms/Input";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import color from "../../../utils/color";
import { connect } from "react-redux";
import { registerUser } from "../../../redux/actions/userAction";
import { clearErrorSucess } from "../../../redux/actions/announcementAction";
import isEmpty from "../../../utils/is-empty";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import proxy from "../../../utils/proxy";
import NativeSelect from "@material-ui/core/NativeSelect";

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
    // Use the system font instead of the default Roboto font.
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
  const [users, setUser] = React.useState({
    role: "",
    username: "",
    password: "",
    name: "",
    nis: "",
    age: "",
    address: "",
    religion: "",
    majorId: [],
    kelas: "",
  });

  const [majors, setMajors] = React.useState([]);

  const [kelass, setClasss] = React.useState([]);

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
        // const majorId = users.majorId.slice(0);
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
    root: {
      borderRadius: "0.5rem",
      padding: "2rem",
      backgroundColor: color.white,
      boxShadow: "0 1rem 3rem rgba(0, 0, 0, 0.175) !important",
    },
    title: {
      color: "#404145",
      fontWeight: "500",
    },
    btn: {
      marginTop: "2rem",
    },
    alert: {
      marginTop: "1.5rem",
    },
  });

  const classes = useStyles();

  const onSubmit = (e) => {
    e.preventDefault();

    registerUser(users);
  };

  const dispatch = useDispatch();

  React.useEffect(() => {
    clearErrorSucess();
    axios.get(`${proxy}/api/majors/view`).then((res) => {
      setMajors(res.data);
    });
    axios.get(`${proxy}/api/class/view`).then((res) => {
      setClasss(res.data);
    });
  }, []);

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8}>
        <form onSubmit={onSubmit}>
          <div className={classes.root}>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              className={classes.title}
            >
              Daftar ke Jarpis
            </Typography>
            <FormLabel component="legend" style={{ marginTop: "2rem" }}>
              <Typography variant="h5" component="p">
                Role
              </Typography>
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="Role"
              value={users.role}
              onChange={handleMenu}
              row
            >
              <FormControlLabel
                value="siswa"
                control={<Radio />}
                label="Siswa"
              />
              <FormControlLabel
                value="teacher"
                control={<Radio />}
                label="Guru"
              />
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin"
              />
            </RadioGroup>
            {/* <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={users.role}
              onChange={handleMenu}
              fullWidth
            >
              <MenuItem value="siswa">Siswa</MenuItem>
              <MenuItem value="teacher">Guru</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select> */}
            {/* <InputLabel
              id="demo-simple-select-label"
              style={{ marginTop: "2rem" }}
            >
              Role
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={users.role}
              onChange={handleMenu}
              fullWidth
            >
              <MenuItem value="Siswa">Siswa</MenuItem>
              <MenuItem value="Guru">Guru</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select> */}
            <Input
              id="username"
              label="Email / Username"
              placeholder="contoh: beta@gmail.com"
              handleChange={handleChange}
            />
            <Input
              id="password"
              label="Password"
              placeholder="*********"
              handleChange={handleChange}
              isPassword={true}
            />
            <Input
              id="name"
              label="Nama Lengkap"
              placeholder="contoh: Beta Kurnia"
              handleChange={handleChange}
            />

            {users.role === "teacher" && (
              <React.Fragment>
                <FormControl
                  component="fieldset"
                  style={{ marginTop: "1.5rem" }}
                >
                  <FormLabel component="legend">Mata Pelajaran</FormLabel>
                  <FormGroup row>
                    {majors.map((major) => (
                      <React.Fragment>
                        <FormControlLabel
                          control={
                            <Checkbox
                              // checked={gilad}
                              value={major._id}
                              onChange={(e) => {
                                handleChange(e, "majorId");
                              }}
                              name={major.majorName}
                            />
                          }
                          label={major.majorName}
                        />
                      </React.Fragment>
                    ))}
                  </FormGroup>
                </FormControl>
                <label
                  style={{
                    marginTop: "1.5rem",
                    display: "block",
                    color: color.label,
                    fontSize: "1rem",
                  }}
                >
                  Kelas
                </label>
                {/* <InputLabel id="demo-simple-select-outlined-label">
                    Kelas
                  </InputLabel> */}
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
                  {kelass.map((kelas) => (
                    <option value={kelas._id}>{kelas.kelas}</option>
                  ))}
                </NativeSelect>
              </React.Fragment>
            )}

            {users.role === "siswa" && (
              <React.Fragment>
                <Input
                  id="nis"
                  label="NIS"
                  placeholder="contoh: 1234567890"
                  handleChange={handleChange}
                />
                <label
                  style={{
                    marginTop: "1.5rem",
                    display: "block",
                    color: color.label,
                    fontSize: "1rem",
                  }}
                >
                  Kelas
                </label>
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
                  {kelass.map((kelas) => (
                    <option value={kelas._id}>{kelas.kelas}</option>
                  ))}
                </NativeSelect>
                <Input
                  id="age"
                  label="Umur"
                  placeholder="contoh: 14 tahun"
                  handleChange={handleChange}
                />
                <Input
                  id="address"
                  label="Alamat"
                  placeholder="contoh: Blater"
                  handleChange={handleChange}
                />
                <Input
                  id="religion"
                  label="Agama"
                  placeholder="contoh: ISLAM"
                  handleChange={handleChange}
                />
              </React.Fragment>
            )}
            {!isEmpty(error) && (
              <Alert className={classes.alert} severity="error">
                {error.username || error.password || error.role || error.name}
              </Alert>
            )}
            {sucess && (
              <Alert className={classes.alert}> Akun berhasil dibuat</Alert>
            )}
            <Grid container justify="center">
              <Grid item xs={12} md={4}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.btn}
                >
                  Daftar
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </Grid>
    </Grid>
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
