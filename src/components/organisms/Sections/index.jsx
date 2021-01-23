import React, { useState, useEffect, Fragment } from "react";

import Header from "../../atoms/Header";
import ExamIcon from "../../atoms/ExamIcon";
import TheoryIcon from "../../atoms/TheoryIcon";
import Section from "../../molecules/Section";
import ExamSection from "../../molecules/ExamSection";
import TheorySection from "../../molecules/TheorySection";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import PeopleIcon from "@material-ui/icons/People";

import axios from "axios";
import { connect } from "react-redux";

import color from "../../../utils/color";
import isEmpty from "../../../utils/is-empty";
import proxy from "../../../utils/proxy";
import { formatUrl } from "../../../utils/format";
import { deleteExam } from "../../../redux/actions/examAction";
import { setError, setSucess } from "../../../redux/actions/helperAction";

function Sections({ id, isStudent, isTeacher, majorName }) {
  const useStyles = makeStyles({
    root: {
      padding: "1rem 0 2rem",
    },
    subRoot: {
      padding: "1.5rem 0 1.5rem",
      borderTop: `0.05px solid ${color.greyLight}`,
    },

    description: {
      marginLeft: "0.5rem",
    },
  });

  const classes = useStyles();

  const [theorys, setTheorys] = useState([]);

  const [exams, setExams] = useState([]);

  const handleDeleteTheory = (i, majorId) => {
    axios.post(`${proxy}/api/theorys/delete/${i}/${majorId}`).then((res) => {
      const { data } = res;

      setTheorys([...data]);
    });
  };

  const handleDeleteExam = (id, type) => {
    axios
      .post(`${proxy}/api/exams/delete/${id}/${type}`)
      .then((res) => {
        const { data } = res;

        setExams([...data]);
        setSucess();
      })
      .catch((err) => {
        setError(err);
      });
  };

  const presentSection = (
    <Section
      icon={<PeopleIcon style={{ width: 120, height: 120 }} />}
      title="Presensi Murid "
      description="Silahkan absen disini"
      id={id}
      isStudent={isStudent}
    />
  );

  const theorySections = theorys.map(
    ({ numberOfTheory, type, description, fileName }) => (
      <TheorySection
        icon={<TheoryIcon />}
        title={`Materi ke ${numberOfTheory}`}
        id={id}
        isStudent={isStudent}
        majorName={majorName}
        numberOfTheory={numberOfTheory}
        type={type}
        handleDelete={handleDeleteTheory}
        isTeacher={isTeacher}
        description={description}
        fileName={fileName}
      />
    )
  );

  const examSections = exams.map(({ type }, i) => (
    <ExamSection
      icon={<ExamIcon style={{ width: 120, height: 120 }} />}
      title={type}
      description={formatUrl(type)}
      id={id}
      isStudent={isStudent}
      majorName={majorName}
      handleDelete={handleDeleteExam}
      type={type}
      isTeacher={isTeacher}
      numberOfTheory={i}
    />
  ));

  useEffect(() => {
    axios
      .get(`${proxy}/api/exams/view-exam/${id}`)
      .then((res) => {
        const { data } = res;

        setExams([...data]);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${proxy}/api/theorys/view/${id}`)
      .then((res) => {
        const { data } = res;

        setTheorys([...data]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className={classes.root}>
      <div>
        <Grid container justify="space-between">
          <Typography> Wali kelas</Typography>
          <Typography>Anggota</Typography>
        </Grid>
      </div>

      {!isEmpty(presentSection) && (
        <Fragment>
          <Header title="Kehadiran" />
          <div className={classes.subRoot}>{presentSection}</div>
        </Fragment>
      )}

      {!isEmpty(theorySections) && (
        <Fragment>
          <Header title="Materi" />
          <div className={classes.subRoot}>{theorySections}</div>
        </Fragment>
      )}
      {!isEmpty(examSections) && (
        <Fragment>
          <Header title="Ujian" />
          <div className={classes.subRoot}>{examSections}</div>
        </Fragment>
      )}
    </div>
  );
}

export default connect(null, { deleteExam })(Sections);
