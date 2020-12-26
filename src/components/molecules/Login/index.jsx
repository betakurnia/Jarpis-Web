import React from "react";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Input from "../../atoms/Input";

import color from "../../../utils/color";
import { loginUser } from "../../../redux/actions/userAction";
import isEmpty from "../../../utils/is-empty";

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
  }, [history, user.isAuthenticated]);

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
