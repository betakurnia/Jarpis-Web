import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import color from "../../../utils/color";
import { registerUser } from "../../../redux/actions/userAction";

function CreateTemp({ registerUser, error, sucess, title, children }) {
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

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8}>
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

export default withRouter(
  connect(mapStateToProps, { registerUser })(CreateTemp)
);
