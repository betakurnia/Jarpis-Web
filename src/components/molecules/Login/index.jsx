import React, { useState, useEffect } from "react";

import Input from "../../atoms/Input";
import ButtonInfo from "../../atoms/ButtonInfo";
import CredentialData from "../../atoms/CredentialData";
import ErrorSucess from "../../atoms/ErrorSucess";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import makeStyles from "@material-ui/styles/makeStyles";
import HelpIcon from "@material-ui/icons/Help";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import color from "../../../utils/color";
import isEmpty from "../../../utils/is-empty";
import { loginUser } from "../../../redux/actions/userAction";

function Login({ loginUser, error, history, user }) {
  const [users, setUser] = useState({
    username: "",
    password: "",
  });

  const [open, setOpen] = useState(false);

  const [credential] = useState([
    {
      role: "Siswa",
      email: "siswa@gmail.com",
      password: "siswa",
    },
    {
      role: "Guru",
      email: "guru@gmail.com",
      password: "guru",
    },
    {
      role: "Admin",
      email: "admin@gmail.com",
      password: "admin",
    },
    {
      role: "Super Admin",
      email: "superadmin@gmail.com",
      password: "********",
    },
  ]);

  const useStyles = makeStyles({
    root: {
      borderRadius: "0.5rem",
      padding: "2rem",
      backgroundColor: color.white,
      boxShadow: "0 1rem 3rem rgba(0, 0, 0, 0.175) ",
    },
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
    credential: {
      backgroundColor: color.primary,
      color: color.white,
    },
    credentialBody: {
      padding: "1rem 1.5rem 1.5rem",
    },
    credentialButton: {
      marginBottom: "1.5rem",
    },
    credentialTitle: {
      fontWeight: "bold",
      paddingBottom: "0.75rem",
      textTransform: "uppercase",
    },
    icon: {
      paddingLeft: "0.25rem",
    },
  });

  const classes = useStyles();

  const onSubmit = (e) => {
    e.preventDefault();

    loginUser(users, history);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    users[name] = value;
    setUser({ ...users });
  };

  const credentials = credential.map(({ role, email, password }) => (
    <CredentialData role={role} email={email} password={password} />
  ));

  useEffect(() => {
    if (user.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [history, user.isAuthenticated]);

  return (
    <div>
      <Container maxWidth="xl">
        {" "}
        <ButtonInfo handleClick={handleClickOpen}>
          Credential <HelpIcon className={classes.icon} />
        </ButtonInfo>
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
                label="Email"
                name="username"
                placeholder="contoh jarpis@gmail.com"
                handleChange={handleChange}
              />
              <Input
                id="password"
                label="Password"
                name="password"
                placeholder="*********"
                handleChange={handleChange}
                type="password"
              />
              <ErrorSucess
                isError={!isEmpty(error)}
                errorMessages={[error.username, error.password]}
              />
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
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="title"
          aria-describedby="description"
        >
          <DialogTitle
            id="title"
            style={{ paddingBottom: 0 }}
            className={classes.credential}
          >
            <Typography
              variant="h5"
              component="h2"
              className={classes.credentialTitle}
            >
              Credential Account
            </Typography>
          </DialogTitle>
          <DialogContent className={classes.credentialBody}>
            <DialogContentText id="description">
              {credentials}
              <Alert severity="warning" className={classes.alert}>
                Anda bisa membuat akun apabila login sebagai Admin
              </Alert>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  error: state.error,
});

export default withRouter(connect(mapStateToProps, { loginUser })(Login));
