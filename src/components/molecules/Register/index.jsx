import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Input from "../../atoms/Input";
import { makeStyles } from "@material-ui/styles";
import color from "../../../utils/color";
import { connect } from "react-redux";
import { registerUser } from "../../../redux/actions/userAction";
import isEmpty from "../../../utils/is-empty";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GET_ERRORS, SET_SUCESS } from "../../../redux/actions";

function Register({ registerUser, error, sucess }) {
  const [users, setUser] = React.useState({
    username: "",
    password: "",
    role: "",
  });

  const handleChange = (e, name) => {
    users[name] = e.target.value;
    setUser(users);
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
    dispatch({ type: GET_ERRORS, payload: {} });
    dispatch({ type: SET_SUCESS, payload: false });
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
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

            <Input
              id="username"
              label="Username"
              placeholder="contoh jarpis@gmail.com"
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
              id="role"
              label="Role"
              placeholder="contoh siswa"
              handleChange={handleChange}
            />
            {!isEmpty(error) && (
              <Alert className={classes.alert} severity="error">
                {error.username || error.password}
              </Alert>
            )}
            {sucess && (
              <Alert className={classes.alert}> Akun berhasil dibuat</Alert>
            )}
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              fullWidth
              className={classes.btn}
            >
              Daftar
            </Button>
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

export default withRouter(connect(mapStateToProps, { registerUser })(Register));
