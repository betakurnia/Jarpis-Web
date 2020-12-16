import React from "react";
import { Grid, Typography, Button, Container } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Input from "../../atoms/Input";
import { makeStyles } from "@material-ui/styles";
import color from "../../../utils/color";
import { connect } from "react-redux";
import { loginUser } from "../../../redux/actions/userAction";
import isEmpty from "../../../utils/is-empty";
import { withRouter } from "react-router-dom";

function Login({ loginUser, error, history, user }) {
  const [users, setUser] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (e, name) => {
    users[name] = e.target.value;
    setUser(users);
  };

  const useStyles = makeStyles({
    root: {
      // border: `1px solid ${color.white}`,
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

    loginUser(users, history);
  };

  React.useEffect(() => {
    if (user.isAuthenticated) {
      history.push("/dashboard");
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <form onSubmit={onSubmit}>
        <div className={classes.root}>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            className={classes.title}
          >
            Masuk ke Jarpis
          </Typography>

          <Input
            id="username"
            label="Email / Username"
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
          {!isEmpty(error) && (
            <Alert className={classes.alert} severity="error">
              {error.username || error.password}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.btn}
          >
            Masuk
          </Button>
        </div>
      </form>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  error: state.error,
});

export default withRouter(connect(mapStateToProps, { loginUser })(Login));
