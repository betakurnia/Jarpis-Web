import React from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { connect } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

import Create from "../../atoms/Create";
import QuestionExam from "../../atoms/QuestionExam";
import ErrorSucess from "../../atoms/ErrorSucess";
import ButtonInfo from "../../atoms/ButtonInfo";
import ButtonRed from "../../atoms/ButtonRed";

import proxy from "../../../utils/proxy";
import { createExamStudent } from "../../../redux/actions/examAction";
import { clearErrorSucess } from "../../../redux/actions/helperAction";
import { Alert } from "@material-ui/lab";
import isEmpty from "../../../utils/is-empty";

function ExamsStudent({ user, createExamStudent, error, sucess }) {
  const { ujian, id } = useParams();

  const [isExam, setSucess] = React.useState(false);

  const [loading, setLoading] = React.useState(true);

  const [examStudentAnswer, setExamStudentAnswer] = React.useState([
    ...new Array(5),
  ]);

  const [exam, setExam] = React.useState([...new Array(5)]);

  const [open, setOpen] = React.useState(false);

  const handleExamStudentAnswer = (e, i) => {
    examStudentAnswer[i] = e.target.value;
    setExamStudentAnswer([...examStudentAnswer]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
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
  }, [id, ujian, user.isAuthenticated.id]);

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
    <Create title={`${ujian.split("-").join(" ")}`}>
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
      <ErrorSucess
        isError={!isEmpty(error)}
        isSucess={Boolean(sucess)}
        errorMessages={[error.examStudentAnswer]}
        sucessMessage="Berhasil dikirim"
      />
      {isExam ? (
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
          <ButtonRed handleClick={handleClose}>Tidak</ButtonRed>
          <ButtonInfo handleClick={handleSubmit}>Ya</ButtonInfo>
        </DialogActions>
      </Dialog>
    </Create>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  error: state.error,
  sucess: state.sucess,
});

export default connect(mapStateToProps, { createExamStudent })(ExamsStudent);
