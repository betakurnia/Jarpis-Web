import React, { useState, useEffect } from "react";

import Input from "../../atoms/Input";
import Paper from "../../atoms/Paper";
import ErrorSucess from "../../atoms/ErrorSucess";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/styles";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import isEmpty from "../../../utils/is-empty";
import { formatUrl } from "../../../utils/format";
import { viewExamByIdAndType, createExam } from "../../../api";

function Exams({ user }) {
  const useStyles = makeStyles({
    root: {
      listStyle: "none",
      "& li": {
        display: "flex",
        alignItems: "flex-end",
      },
    },
    btn: {
      marginTop: "2rem",
    },
    icon: {
      paddingLeft: "0.5rem",
    },
  });

  const classes = useStyles();

  const { ujian, id } = useParams();

  const [exams, setExams] = useState([]);

  const [dataAnswers] = useState([
    {
      value: "a",
      label: "Jawaban a",
      idx: 0,
    },
    {
      value: "b",
      label: "Jawaban b",
      idx: 1,
    },
    {
      value: "c",
      label: "Jawaban c",
      idx: 2,
    },
    {
      value: "d",
      label: "Jawaban d",
      idx: 3,
    },
  ]);

  const [exam, setExam] = useState([...new Array(5)]);

  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState({});

  const [isSucess, setIsSucess] = useState(false);

  const handleMenus = (e, i) => {
    exam[i].answer = e.target.value;

    setExam([...exam]);
  };

  const handleAddQuestion = () => {
    const question = [
      { possibilitesAnswer: [] },
      { possibilitesAnswer: [] },
      { possibilitesAnswer: [] },
      { possibilitesAnswer: [] },
      { possibilitesAnswer: [] },
    ];
    setExam([...exam, ...question]);
  };

  const handleChange = (e, id, idx) => {
    const { name, value } = e.target;

    if (Boolean(idx)) {
      exam[name].possibilitesAnswer[idx] = value;
      setExam([...exam]);
    }

    if (!Boolean(idx)) {
      exam[name].examName = value;
      setExam([...exam]);
    }
  };

  const handleSubmit = async () => {
    await createExam({
      userId: "guru",
      teacherId: user.user.id,
      majorId: id,
      question: exam,
      type: ujian,
    });
  };

  const questionExams =
    !loading &&
    exams.map(({ examName, answer, possibilitesAnswer }, i) => (
      <div>
        <Input
          id={i}
          label={`Soal no ${i + 1}`}
          handleChange={handleChange}
          value={examName}
        />
        <ul className={classes.root}>
          <RadioGroup
            aria-label="answer"
            name={i}
            value={answer}
            onChange={(e) => {
              handleMenus(e, i);
            }}
          >
            {dataAnswers.map(({ value, label, idx }) => (
              <li>
                {" "}
                <FormControlLabel value={value} control={<Radio />} />{" "}
                <Input
                  id={i}
                  label={label}
                  name={i}
                  idx={idx}
                  handleChange={handleChange}
                  value={possibilitesAnswer[0]}
                />
              </li>
            ))}
          </RadioGroup>
        </ul>
      </div>
    ));

  useEffect(() => {
    async function fetchApi() {
      const exams = await viewExamByIdAndType(id, ujian);

      if (Boolean(exams)) {
        setExam([...exams.question]);
      }

      if (!Boolean(exams)) {
        exam.forEach((empty, i) => {
          const question = {
            possibilitesAnswer: [],
          };
          exam[i] = question;
        });
        setExam([...exam]);
      }
      setLoading(false);
    }

    fetchApi();
  }, [id]);

  return (
    <Paper title={formatUrl(ujian)}>
      {questionExams}
      <Button
        variant="contained"
        color="secondary"
        className={classes.btn}
        onClick={handleAddQuestion}
      >
        Tambah 5 Soal <AddIcon className={classes.icon} />
      </Button>{" "}
      <ErrorSucess
        isError={!isEmpty(errors)}
        isSucess={isSucess}
        errorMessages={[errors.examStudentAnswer]}
        sucessMessage="Berhasil Dibuat"
      />
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            className="btn-light-black"
            onClick={handleSubmit}
            className={classes.btn}
            fullWidth
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Exams);
