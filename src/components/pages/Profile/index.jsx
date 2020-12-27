import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import { getUserById } from "../../../redux/actions/userAction";

function Profile({ user, getUserById }) {
  const useStyles = makeStyles({
    root: {
      padding: "4rem 0rem ",
      boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
    },
    name: {
      fontWeight: 800,
    },
    clas: {
      marginTop: "2rem",
      fontSize: "1.5rem ",
    },
  });

  const classes = useStyles();

  React.useEffect(() => {
    getUserById(user.isAuthenticated.id);
  }, [getUserById, user.isAuthenticated.id]);

  return (
    <div className={classes.root}>
      {Object.keys(user.userData).length > 1 && (
        <Grid container justify="center" spacing={6}>
          <Grid item xs={4} md={2}>
            <Avatar style={{ width: "100%", height: 160 }}></Avatar>
          </Grid>
          <Grid item xs={6} md={8}>
            <Typography
              variant="h4"
              component="h2"
              style={{ fontWeight: "bold" }}
            >
              {user.userData.name}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              style={{
                marginTop: "0.75rem",
                fontSize: "1.1rem",
                color: "#757575",
              }}
            >
              Kelas: {user.userData.kelas.kelas}{" "}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              style={{
                marginTop: "0.75rem",
                fontSize: "1.1rem",
                color: "#757575",
              }}
            >
              Umur: {user.userData.age} Tahun
            </Typography>
            <Typography
              variant="body1"
              component="p"
              classes={classes.clas}
            ></Typography>
            <Typography
              variant="body1"
              component="p"
              style={{
                marginTop: "0.75rem",
                fontSize: "1.1rem",
                color: "#757575",
              }}
            >
              Kota: {user.userData.address}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              style={{
                marginTop: "0.75rem",
                fontSize: "1.1rem",
                color: "#757575",
              }}
            >
              Agama: {user.userData.religion}
            </Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUserById })(Profile);
