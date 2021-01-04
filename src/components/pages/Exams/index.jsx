import React from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import Input from "../../atoms/Input";
import Create from "../../atoms/Create";
import ErrorSucess from "../../atoms/ErrorSucess";

import proxy from "../../../utils/proxy";
import isEmpty from "../../../utils/is-empty";
import color from "../../../utils/color";
import { createExam } from "../../../redux/actions/examAction";
import { clearErrorSucess } from "../../../redux/actions/helperAction";

function Exams({ error, sucess, createExam, user, clearErrorSucess }) {
  const useStyles = makeStyles({
    root: {
      listStyle: "none",
      "& li": {
        display: "flex",
        alignItems: "flex-end",
      },
    },
  });

  const classes = useStyles();

  const { ujian, id } = useParams();

  const [exam, setExam] = React.useState([...new Array(5)]);

  const [loading, setLoading] = React.useState(true);

  const handleMenus = (e, i) => {
    exam[i].answer = e.target.value;

    setExam([...exam]);
  };

  const handleAdd = (e) => {
    const question = [
      { examName: "", possibilitesAnswer: ["", "", "", ""], answer: "" },
      { examName: "", possibilitesAnswer: ["", "", "", ""], answer: "" },
      { examName: "", possibilitesAnswer: ["", "", "", ""], answer: "" },
      { examName: "", possibilitesAnswer: ["", "", "", ""], answer: "" },
      { examName: "", possibilitesAnswer: ["", "", "", ""], answer: "" },
    ];
    setExam([...exam, ...question]);
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

  const handleSubmit = () => {
    createExam({
      userId: "guru",
      teacherId: user.user.id,
      majorId: id,
      question: exam,
      type: ujian,
    });
  };

  React.useEffect(() => {
    clearErrorSucess();
    axios.get(`${proxy}/api/exams/view/${id}?type=${ujian}`).then((res) => {
      if (res.data) {
        console.log(res.data);
        setExam([...res.data.question]);
      } else {
        exam.forEach((a, i) => {
          let obj = {
            examName: "",
            possibilitesAnswer: ["", "", "", ""],
            answer: "",
          };
          exam[i] = obj;
        });
        setExam([...exam]);
      }
      setLoading(false);
    });
  }, [id]);

  return (
    <Create title={`${ujian.split("-").join(" ")}`}>
      {!loading &&
        exam.map((arr, i) => (
          <React.Fragment>
            <Input
              id={i}
              label={`Soal no ${i + 1}`}
              placeholder=""
              handleChange={handleChange}
              value={arr.examName}
            ></Input>
            <ul className={classes.root}>
              <RadioGroup
                aria-label="answer"
                name={i}
                value={arr.answer}
                onChange={(e) => {
                  handleMenus(e, i);
                }}
              >
                <li>
                  {" "}
                  <FormControlLabel value="a" control={<Radio />} />{" "}
                  <Input
                    id={`${i}`}
                    label="Jawaban a"
                    // placeholder="contoh: 1 + 1"
                    idx={0}
                    handleChange={handleChange}
                    value={arr.possibilitesAnswer[0]}
                  ></Input>
                </li>
                <li>
                  <FormControlLabel value="b" control={<Radio />} />{" "}
                  <Input
                    id={`${i}`}
                    label="Jawaban b"
                    // placeholder="contoh: 1 + 1"
                    idx={1}
                    handleChange={handleChange}
                    value={arr.possibilitesAnswer[1]}
                  ></Input>
                </li>
                <li>
                  <FormControlLabel value="c" control={<Radio />} />{" "}
                  <Input
                    id={`${i}`}
                    label="Jawaban c"
                    // placeholder="contoh: 1 + 1"
                    idx={2}
                    handleChange={handleChange}
                    value={arr.possibilitesAnswer[2]}
                  ></Input>
                </li>
                <li>
                  <FormControlLabel value="d" control={<Radio />} />{" "}
                  <Input
                    id={`${i}`}
                    label="Jawaban d"
                    // placeholder="contoh: 1 + 1"
                    idx={3}
                    handleChange={handleChange}
                    value={arr.possibilitesAnswer[3]}
                  ></Input>
                </li>
              </RadioGroup>
            </ul>
          </React.Fragment>
        ))}
      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: "2rem" }}
        onClick={handleAdd}
      >
        Tambah 5 Soal <AddIcon style={{ paddingLeft: "0.5rem" }} />
      </Button>{" "}
      <ErrorSucess
        isError={!isEmpty(error)}
        isSucess={!isEmpty(sucess)}
        errorMessages={[error.examStudentAnswer]}
        sucessMessage="Berhasil Dibuat"
      />
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: "1.5rem" }}
            fullWidth
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Create>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  error: state.error,
  sucess: state.sucess,
});

export default connect(mapStateToProps, { createExam, clearErrorSucess })(
  Exams
);
