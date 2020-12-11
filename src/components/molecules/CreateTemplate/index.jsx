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

function Register({ registerUser, error, sucess, title, children }) {
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

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.root}>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            className={classes.title}
          >
            {title}
          </Typography>
          {children}
        </div>
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
