import React, { useState, useEffect, Fragment } from "react";

import Header from "../../atoms/Header";
import ExamIcon from "../../atoms/ExamIcon";
import TheoryIcon from "../../atoms/TheoryIcon";
import Section from "../../molecules/Section";
import ExamSection from "../../molecules/ExamSection";
import TheorySection from "../../molecules/TheorySection";

import makeStyles from "@material-ui/styles/makeStyles";
import PeopleIcon from "@material-ui/icons/People";
import Alert from "@material-ui/lab/Alert";

import axios from "axios";

import color from "../../../utils/color";
import isEmpty from "../../../utils/is-empty";
import proxy from "../../../utils/proxy";
import { formatUrl } from "../../../utils/format";
import { viewExams, viewTheorys, deleteExam } from "../../../api";

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
    alert: {
      marginBottom: "1.5rem",
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

  const handleDeleteExam = async (id, type) => {
    const examData = await deleteExam(id, type);
    setExams([...examData]);
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

  const presentWarningNotStudent = !isStudent && (
    <Alert className={classes.alert} severity="warning">
      Presensi hanya tersedia untuk siswa dan guru
    </Alert>
  );

  const warningNotStudent = !isStudent && (
    <Alert severity="warning" className={classes.alert}>
      Ujian hanya tersedia untuk siswa
    </Alert>
  );

  useEffect(() => {
    async function fetchApi() {
      const examData = await viewExams(id);

      setExams([...examData]);

      const theorysData = await viewTheorys(id);

      setTheorys([...theorysData]);
    }
    fetchApi();
  }, [id]);

  return (
    <div className={classes.root}>
      {presentWarningNotStudent}
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
          {warningNotStudent}
          <Header title="Ujian" />
          <div className={classes.subRoot}>{examSections}</div>
        </Fragment>
      )}
    </div>
  );
}

export default Sections;
