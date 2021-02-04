import React, { useState, useEffect } from "react";

import Card from "../../atoms/Card";
import Headers from "../../atoms/Headers";

import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";

import {
  viewMajorsStudent,
  viewMajorsTeacher,
  viewMajorsAdmin,
} from "../../../api";

function Dashboard({ user }) {
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    const { role, majorId } = user.isAuthenticated;

    const { kelasId } = user.user;

    async function fetchMajorStudent() {
      const majors = await viewMajorsStudent(kelasId);

      setMajors([...majors]);
    }

    async function fetchMajorsTeacher() {
      const majors = await viewMajorsTeacher(majorId);

      setMajors([...majors]);
    }

    async function fetchMajorAdmin() {
      const majors = await viewMajorsAdmin();

      setMajors([...majors]);
    }

    if (role === "siswa") {
      fetchMajorStudent();
    }

    if (role === "teacher") {
      fetchMajorsTeacher();
    }

    if (role === "admin") {
      fetchMajorAdmin();
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
