import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Section from "../../atoms/Section";
import ExamSection from "../../atoms/ExamSection";
import TheorySection from "../../atoms/TheorySection";
import DescriptionIcon from "@material-ui/icons/Description";
import PeopleIcon from "@material-ui/icons/People";
import color from "../../../utils/color";
import proxy from "../../../utils/proxy";
import { deleteExam } from "../../../redux/actions/examAction";
import { Alert } from "@material-ui/lab";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import { GET_ERRORS, SET_SUCESS } from "../../../redux/actions";

function Sections({ id, isStudent, isTeacher, majorName }) {
  const useStyles = makeStyles({
    root: {
      padding: "1rem 0 2rem",
    },
    subRoot: {
      padding: "2rem 0 2rem",
      borderBottom: `0.05px solid #bdbdbd`,
    },
  });

  const classes = useStyles();

  const dispatch = useDispatch();

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
        dispatch({ type: GET_ERRORS, payload: {} });
        dispatch({ type: SET_SUCESS, payload: true });
      })
      .catch((err) => {
        dispatch({ type: SET_SUCESS, payload: false });
        dispatch({ type: GET_ERRORS, payload: err.response.data });
      });
  };

  React.useEffect(() => {
    axios
      .get(`${proxy}/api/exams/view-exam/${id}`)
      .then((res) => {
        console.log(res.data);
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
        <Alert
          severity="warning"
          style={{ marginTop: "0", marginBottom: "1.5rem" }}
        >
          Presensi hanya tersedia untuk siswa
        </Alert>
      )}
      <Grid container spacing={2} className={classes.subRoot}>
        <Section
          icon={<PeopleIcon style={{ width: "100%", height: 160 }} />}
          title="Presensi Murid "
          description="Silahkan absen disini"
          isLink={true}
          id={id}
          isStudent={isStudent}
        />
      </Grid>
      <Grid container spacing={2} className={classes.subRoot}>
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
                      alert("sucess");
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
            isLink={true}
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
