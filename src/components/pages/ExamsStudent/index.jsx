import React from "react";
import CKEditor from "../../atoms/CKEditor";
import CreateTemplate from "../../molecules/CreateTemplate";
import TheoryTemplate from "../../molecules/TheoryTemplate";
import { useParams } from "react-router-dom";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Input from "../../atoms/Input";
import axios from "axios";
import proxy from "../../../utils/proxy";
import IsEmpty from "../../../utils/is-empty";
import QuestionExam from "../../molecules/QuestionExam";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect, useDispatch } from "react-redux";
import { createExamStudent } from "../../../redux/actions/examAction";
import { clearErrorSucess } from "../../../redux/actions/announcementAction";
import { Alert } from "@material-ui/lab";
import isEmpty from "../../../utils/is-empty";

function ExamsStudent({ user, createExamStudent, error, sucess }) {
  const dispatch = useDispatch();

  const [suces, setSucess] = React.useState(false);

  const [role, setRole] = React.useState("5");
  // const [arrLen, setArrLen] = React.useState([...new Array(20)]);

  const [loading, setLoading] = React.useState(true);

  const [examStudentAnswer, setExamStudentAnswer] = React.useState([
    ...new Array(5),
  ]);

  const [exam, setExam] = React.useState([...new Array(5)]);

  const { ujian, id } = useParams();

  const handleMenu = (e) => {
    setRole(e.target.value);
    setExam([...new Array(Number(e.target.value))]);
  };

  const handleExamStudentAnswer = (e, i) => {
    examStudentAnswer[i] = e.target.value;
    setExamStudentAnswer([...examStudentAnswer]);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e, id, idx = false) => {
    if (idx === false) {
      exam[id].examName = e.target.value;
      setExam([...exam]);
    } else {
      exam[id].possibilitesAnswer[idx] = e.target.value;
      setExam([...exam]);
    }
  };

  React.useEffect(() => {
    // window.scrollTo(0);
    clearErrorSucess();
    axios
      .get(
        `${proxy}/api/exams/view/${id}/${user.isAuthenticated.id}?type=${ujian}`
      )
      .then((res) => {
        if (res.data) {
          setSucess(true);
          setExamStudentAnswer([...res.data.examStudentAnswer]);
          setExam([...res.data.question]);
          setLoading(false);
        } else {
          axios
            .get(`${proxy}/api/exams/view/${id}?type=${ujian}`)
            .then((res) => {
              setExamStudentAnswer([...res.data.examStudentAnswer]);
              setExam([...res.data.question]);
              setLoading(false);
            });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = () => {
    setOpen(false);

    createExamStudent({
      userId: user.user.id,
      majorId: id,
      question: exam,
      type: ujian,
      examStudentAnswer,
    });
  };

  return (
    <CreateTemplate title={`${ujian}`}>
      <div
        style={{
          paddingBottom: "2rem",
          borderBottom: `0.05px solid #bdbdbd`,
        }}
      ></div>
      <div style={{ paddingTop: "1rem" }}></div>
      {!loading &&
        exam.map((exam, i) => (
          <QuestionExam
            i={i + 1}
            title={exam.examName}
            aAnswer={exam.possibilitesAnswer[0]}
            bAnswer={exam.possibilitesAnswer[1]}
            cAnswer={exam.possibilitesAnswer[2]}
            dAnswer={exam.possibilitesAnswer[3]}
            handleChange={handleExamStudentAnswer}
            value={examStudentAnswer[i]}
            answer={examStudentAnswer[i]}
          />
        ))}
      {sucess && <Alert>Berhasil dikirim</Alert>}
      {!isEmpty(error) && (
        <Alert severity="error">{error.examStudentAnswer}</Alert>
      )}
      {suces ? (
        <Alert>Anda telah mengikuti Ujian</Alert>
      ) : (
        <Grid container justify="center">
          <Grid item xs={12} md={6}>
            {" "}
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
              style={{ marginTop: "1.5rem" }}
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah anda yakin ingin submit?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            color="primary"
            style={{ backgroundColor: "#28a745", color: "#ffffff" }}
          >
            Ya
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
            autoFocus
            style={{ backgroundColor: "#ffffff", color: "#dc3545" }}
          >
            Tidak
          </Button>
        </DialogActions>
      </Dialog>
    </CreateTemplate>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  error: state.error,
  sucess: state.sucess,
});

export default connect(mapStateToProps, { createExamStudent })(ExamsStudent);
