import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import color from "../../../utils/color";
import { registerUser } from "../../../redux/actions/userAction";

function Paper({ title, children }) {
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
  });

  const classes = useStyles();

  return (
    <Container maxWidth="md">
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
    </Container>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  error: state.error,
  sucess: state.sucess,
});

export default withRouter(connect(mapStateToProps, { registerUser })(Paper));
