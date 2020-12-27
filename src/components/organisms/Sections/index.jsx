import React from "react";

import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import axios from "axios";
import { connect } from "react-redux";

import Section from "../../atoms/Section";
import ExamSection from "../../atoms/ExamSection";
import TheorySection from "../../molecules/TheorySection";

import { deleteExam } from "../../../redux/actions/examAction";
import { setError, setSucess } from "../../../redux/actions/helperAction";
import proxy from "../../../utils/proxy";

function Sections({ id, isStudent, isTeacher, majorName }) {
  const useStyles = makeStyles({
    alert: {
      marginTop: "0",
      marginBottom: "1.5rem",
    },
    root: {
      padding: "1rem 0 2rem",
    },
    subRoot: {
      padding: "2rem 0 2rem",
      borderBottom: `0.05px solid #bdbdbd`,
    },
  });

  const classes = useStyles();

  const [theorys, setTheorys] = React.useState([]);

  const [exams, setExams] = React.useState([]);

  const handleDeleteTheory = (e, i, majorId) => {
    axios.post(`${proxy}/api/theorys/delete/${i}/${majorId}`).then((res) => {
      setTheorys([...res.data]);
    });
  };

  const deleteExam = (id, type) => {
    axios
      .post(`${proxy}/api/exams/delete/${id}/${type}`)
      .then((res) => {
        setExams([...res.data]);
        setSucess();
      })
      .catch((err) => {
        setError(err);
      });
  };

  React.useEffect(() => {
    axios
      .get(`${proxy}/api/exams/view-exam/${id}`)
      .then((res) => {
        setExams([...res.data]);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${proxy}/api/theorys/view/${id}`)
      .then((res) => {
        setTheorys([...res.data]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className={classes.root}>
      {!isStudent && (
        <Alert className={classes.alert} severity="warning">
          Presensi hanya tersedia untuk siswa
        </Alert>
      )}
      <Grid container spacing={2} className={classes.subRoot}>
        <Section
          icon={<PeopleIcon style={{ width: "100%", height: 160 }} />}
          title="Presensi Murid "
          description="Silahkan absen disini"
          id={id}
          isStudent={isStudent}
        />
      </Grid>
      <Grid container spacing={3} className={classes.subRoot}>
        {theorys.map((theory) => (
          <TheorySection
            icon={
              <img
                src={"/helper/theorys.jpg"}
                alt="exam"
                style={{ width: "100%", height: 100 }}
              />
            }
            title={`Materi ke ${theory.numberOfTheory}`}
            isLink={true}
            id={id}
            isStudent={isStudent}
            majorName={majorName}
            i={theory.numberOfTheory}
            handleDelete={handleDeleteTheory}
            isTeacher={isTeacher}
          >
            <Grid
              container
              alignItems="flex-end"
              style={{ paddingTop: "0.25rem" }}
            >
              <AssignmentIcon /> {theory.description}
            </Grid>
            <Grid
              container
              alignItems="flex-end"
              style={{ paddingTop: "0.75rem" }}
            >
              <SystemUpdateAltIcon />{" "}
              <span
                style={{ padding: "0 0.5rem", cursor: "pointer" }}
                onClick={() => {
                  axios
                    .get(
                      `${proxy}/api/theorys/download?filename=${theory.fileName}`
                    )
                    .then(() => {
                      // fileDownload(data, `${theory.fileName}`);
                    })
                    .catch((err) => console.log("error"));
                }}
              >
                {" "}
                Download {theory.fileName}
              </span>
            </Grid>
          </TheorySection>
        ))}
      </Grid>
      <Grid container spacing={2} className={classes.subRoot}>
        {exams.map((exam, i) => (
          <ExamSection
            icon={
              <img
                src={"/helper/exam.png"}
                alt="exam"
                style={{ width: "100%", height: 200 }}
              />
            }
            title={exam.type}
            description={exam.type.split("-").join(" ")}
            id={id}
            isStudent={isStudent}
            majorName={majorName}
            handleDelete={deleteExam}
            type={exam.type}
            isTeacher={isTeacher}
            i={i}
          />
        ))}
      </Grid>
    </div>
  );
}

export default connect(null, { deleteExam })(Sections);
