import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import { getUserById } from "../../../redux/actions/userAction";
import color from "../../../utils/color";

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
    title: {
      fontWeight: "bold",
    },
    description: {
      marginTop: "0.75rem",
      fontSize: "1.1rem",
      color: color.lightGray,
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
            <Typography variant="h4" component="h2" className={classes.title}>
              {user.userData.name}
            </Typography>
            <div className={classes.description}>
              <Typography variant="body1" component="p">
                Kelas: {user.userData.kelas.kelas}{" "}
              </Typography>
              <Typography variant="body1" component="p">
                Umur: {user.userData.age} Tahun
              </Typography>
              <Typography variant="body1" component="p">
                Kota: {user.userData.address}
              </Typography>
              <Typography variant="body1" component="p">
                Agama: {user.userData.religion}
              </Typography>
            </div>
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
