import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Sections from "../../molecules/Sections";
import color from "../../../utils/color";
import { connect } from "react-redux";

function Topic({ id, major, user }) {
  const useStyles = makeStyles({
    root: {
      backgroundColor: color.white,
      padding: "2rem",
      boxShadow: "0 1rem 3rem rgba(0, 0, 0, 0.175) !important",
      borderBottomLeftRadius: "0.5rem",
      borderTopLeftradius: "0.5rem",
    },
    header: {
      backgroundColor: color.primary,
      color: color.white,
      padding: "1rem 2rem",
      borderTopLeftRadius: "0.5rem",
      borderTopRightRadius: "0.5rem",
    },
    // major: {

    // }
  });

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.header}>
        <Typography variant="h4" component="h1">
          {major.majorName}
        </Typography>
      </div>
      <div className={classes.root}>
        <Grid container>
          <Sections id={id} isStudent={user.isAuthenticated.role === "siswa"} />
        </Grid>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Topic);
