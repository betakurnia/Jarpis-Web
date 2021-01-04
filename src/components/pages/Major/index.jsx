import React from "react";
import { useParams } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/styles/makeStyles";
import { connect } from "react-redux";
import axios from "axios";

import Sections from "../../organisms/Sections";

import color from "../../../utils/color";
import proxy from "../../../utils/proxy";

function Major({ user }) {
  const { id } = useParams();

  const [major, setMajor] = React.useState({});

  React.useEffect(() => {
    axios
      .get(`${proxy}/api/majors/view/${id}`)
      .then((res) => {
        setMajor(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

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
    title: {
      fontWeight: 500,
    },
  });

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.header}>
        <Typography variant="h4" component="h1" className={classes.title}>
          {major.majorName}
        </Typography>
      </div>
      <div className={classes.root}>
        <Container maxWidth="lg">
          <Sections
            id={id}
            isStudent={user.isAuthenticated.role === "siswa"}
            isTeacher={user.isAuthenticated.role === "teacher"}
            majorName={major.majorName}
          />
        </Container>
      </div>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Major);
