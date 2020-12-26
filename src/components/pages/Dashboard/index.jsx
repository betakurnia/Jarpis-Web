import React from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { connect } from "react-redux";

import Card from "../../atoms/Card";

import proxy from "../../../utils/proxy";

function Dashboard({ user }) {
  const [majors, setMajors] = React.useState([]);

  React.useEffect(() => {
    if (user.isAuthenticated.role === "teacher") {
      axios
        .post(`${proxy}/api/majors/viewByArray`, user.isAuthenticated.majorId)
        .then((res) => {
          setMajors(res.data);
        });
    } else {
      axios
        .get(`${proxy}/api/majors/view?kelasId=${user.user.kelasId}`)
        .then((res) => {
          setMajors(res.data);
        });
    }
  }, [
    user.isAuthenticated.majorId,
    user.user.kelasId,
    user.isAuthenticated.role,
  ]);

  return (
    <div>
      <Grid container spacing={2}>
        {majors.map((major) => (
          <Card
            id={major._id}
            title={major.majorName}
            from={major.hoursOfSubject}
            to={major.hoursOfSubjectFinish}
          />
        ))}
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Dashboard);
