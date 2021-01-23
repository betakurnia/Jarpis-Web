import React, { useState, useEffect } from "react";

import Card from "../../atoms/Card";
import Headers from "../../atoms/Headers";

import Grid from "@material-ui/core/Grid";

import axios from "axios";
import { connect } from "react-redux";

import proxy from "../../../utils/proxy";

function Dashboard({ user }) {
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    const { role, majorId } = user.isAuthenticated;

    if (role === "teacher") {
      axios.post(`${proxy}/api/majors/viewByArray`, majorId).then((res) => {
        const { data } = res;

        setMajors([...data]);
      });
    }

    if (role === "siswa") {
      axios
        .get(`${proxy}/api/majors/view?kelasId=${user.user.kelasId}`)
        .then((res) => {
          const { data } = res;

          setMajors([...data]);
        });
    }

    if (role === "admin") {
      axios.get(`${proxy}/api/majors/view`).then((res) => {
        const { data } = res;

        setMajors([...data]);
      });
    }
  }, [user.isAuthenticated.majorId]);

  const majorCards = majors.map(
    ({
      _id,
      majorName,
      hoursOfSubject,
      hoursOfSubjectFinish,
      imageName,
      color,
    }) => (
      <Card
        id={_id}
        title={majorName}
        from={hoursOfSubject}
        to={hoursOfSubjectFinish}
        imageName={imageName}
        color={color}
      />
    )
  );

  return (
    <div>
      <Headers title="Mata Pelajaran" />
      <Grid container spacing={3}>
        {majorCards}
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Dashboard);
