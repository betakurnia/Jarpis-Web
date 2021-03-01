import React, { useState, useEffect, Fragment } from "react";

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

  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    }

    if (role === "teacher") {
      fetchMajorsTeacher();
      setIsLoading(false);
    }

    if (role === "admin") {
      fetchMajorAdmin();
      setIsLoading(false);
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
      {!isLoading ? (
        <Fragment>
          <Headers title="Mata Pelajaran" />
          <Grid container spacing={3}>
            {majorCards}
          </Grid>
        </Fragment>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Dashboard);
