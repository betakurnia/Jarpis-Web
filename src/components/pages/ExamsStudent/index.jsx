import React, { useState, useEffect } from "react";

import Paper from "../../atoms/Paper";
import QuestionExam from "../../atoms/QuestionExam";
import ErrorSucess from "../../atoms/ErrorSucess";
import ButtonInfo from "../../atoms/ButtonInfo";
import ButtonRed from "../../atoms/ButtonRed";
import Dialogs from "../../atoms/Dialogs";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/styles/makeStyles";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import proxy from "../../../utils/proxy";
import isEmpty from "../../../utils/is-empty";
import { formatUrl } from "../../../utils/format";
import { createExamStudent } from "../../../redux/actions/examAction";
import { clearErrorSucess } from "../../../redux/actions/helperAction";

function ExamsStudent({ user, createExamStudent, error, sucess }) {
  const useStyles = makeStyles({
    btn: {
      marginTop: "1.5rem",
    },
  });

  const classes = useStyles();

  const { ujian, id } = useParams();

  const [examStudentAnswer, setExamStudentAnswer] = useState([...new Array(5)]);

  const [exam, setExam] = useState([...new Array(5)]);

  const [isExam, setSucess] = useState(false);

  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

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

  const questionExams =
    !loading &&
    exam.map(({ examName, possibilitesAnswer }, i) => (
      <QuestionExam
        numberOfQuestion={i + 1}
        title={examName}
        aAnswer={possibilitesAnswer[0]}
        bAnswer={possibilitesAnswer[1]}
        cAnswer={possibilitesAnswer[2]}
        dAnswer={possibilitesAnswer[3]}
        handleChange={handleExamStudentAnswer}
        value={examStudentAnswer[i]}
        answer={examStudentAnswer[i]}
      />
    ));

  const isParticipatedExam = isExam ? (
    <Alert>Anda telah mengikuti Ujian</Alert>
  ) : (
    <Grid container justify="center">
      <Grid item xs={12} md={6}>
        {" "}
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          fullWidth
          className={classes.btn}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );

  useEffect(() => {
    clearErrorSucess();
    axios
      .get(
        `${proxy}/api/exams/view/${id}/${user.isAuthenticated.id}?type=${ujian}`
      )
      .then((res) => {
        const { data } = res;

        if (Boolean(data)) {
          setSucess(true);
          setExamStudentAnswer([...data.examStudentAnswer]);
          setExam([...data.question]);
          setLoading(false);
        }

        if (!Boolean(data)) {
          axios
            .get(`${proxy}/api/exams/view/${id}?type=${ujian}`)
            .then((res) => {
              const { data } = res;

              setExamStudentAnswer([...data.examStudentAnswer]);
              setExam([...data.question]);
              setLoading(false);
            });
        }
      })
      .catch((err) => console.log(err));
  }, [id, ujian, user.isAuthenticated.id]);

  return (
    <Paper title={formatUrl(ujian)}>
      {questionExams}
      <ErrorSucess
        isSucess={Boolean(sucess)}
        isError={!isEmpty(error)}
        errorMessages={[error.examStudentAnswer]}
        sucessMessage="Berhasil dikirim"
      />
      {isParticipatedExam}
      <Dialogs
        open={open}
        handleClose={handleClose}
        title="Apakah anda yakin ingin submit?"
      >
        {" "}
        <ButtonRed handleClick={handleClose}>Tidak</ButtonRed>
        <ButtonInfo handleClick={handleSubmit}>Ya</ButtonInfo>
      </Dialogs>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  error: state.error,
  sucess: state.sucess,
});

export default connect(mapStateToProps, { createExamStudent })(ExamsStudent);
