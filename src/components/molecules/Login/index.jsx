import React from "react";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import HelpIcon from "@material-ui/icons/Help";

import Input from "../../atoms/Input";
import ButtonInfo from "../../atoms/ButtonInfo";
import CredentialData from "../../atoms/CredentialData";

import { loginUser } from "../../../redux/actions/userAction";
import color from "../../../utils/color";
import isEmpty from "../../../utils/is-empty";

function Login({ loginUser, error, history, user }) {
  const [users, setUser] = React.useState({
    username: "",
    password: "",
  });

  const [open, setOpen] = React.useState(false);

  const [credential] = React.useState([
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

  const handleChange = (e, name) => {
    users[name] = e.target.value;
    setUser(users);
  };

  React.useEffect(() => {
    if (user.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [history, user.isAuthenticated]);

  return (
    <React.Fragment>
      <Container maxWidth="xl">
        {" "}
        <ButtonInfo
          handleDelete={handleClickOpen}
          style={{ padding: "0.25rem 0.875rem", marginBottom: "1.5rem" }}
          className={classes.credentialButton}
        >
          Credential <HelpIcon style={{ paddingLeft: "0.25rem" }} />
        </ButtonInfo>
      </Container>

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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ paddingBottom: 0 }}
          className={classes.credential}
        >
          <Typography
            variant="h5"
            component="h2"
            style={{
              fontWeight: "bold",
              paddingBottom: "0.75rem",
              textTransform: "uppercase",
            }}
          >
            Credential Account
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.credentialBody}>
          <DialogContentText id="alert-dialog-description">
            {credential.map((cred) => (
              <CredentialData
                role={cred.role}
                email={cred.email}
                password={cred.password}
              />
            ))}
            <Alert severity="warning" className={classes.alert}>
              Anda bisa membuat akun apabila login sebagai Admin
            </Alert>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  error: state.error,
});

export default withRouter(connect(mapStateToProps, { loginUser })(Login));
