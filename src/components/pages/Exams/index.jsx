import React from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import Input from "../../atoms/Input";
import Create from "../../atoms/Create";
import TheoryTemplate from "../../molecules/TheoryTemplate";

import proxy from "../../../utils/proxy";
import isEmpty from "../../../utils/is-empty";
import { createExam } from "../../../redux/actions/examAction";
import { clearErrorSucess } from "../../../redux/actions/helperAction";

function Exams({ error, sucess, createExam, user, clearErrorSucess }) {
  const [loading, setLoading] = React.useState(true);

  const [exam, setExam] = React.useState([...new Array(5)]);

  const { ujian, id } = useParams();

  const handleMenus = (e, i) => {
    exam[i].answer = e.target.value;

    setExam([...exam]);
  };

  const [tipes] = React.useState([]);

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
  }, [id, ujian, exam, clearErrorSucess]);

  const handleSubmit = () => {
    createExam({
      userId: "guru",
      teacherId: user.user.id,
      majorId: id,
      question: exam,
      type: ujian,
    });
  };

  return (
    <Create title={`${ujian}`}>
      <div
        style={{
          paddingBottom: "2rem",
          borderBottom: `0.05px solid #bdbdbd`,
        }}
      ></div>
      {tipes.map(({ tipe }) => (
        <React.Fragment>
          <TheoryTemplate title={tipe}></TheoryTemplate>
        </React.Fragment>
      ))}
      {!loading &&
        exam.map((arr, i) => (
          <React.Fragment>
            <Input
              id={i}
              label={`Soal no ${i + 1}`}
              placeholder="contoh: 1 + 1"
              handleChange={handleChange}
              value={arr.examName}
            ></Input>
            <ul style={{ listStyle: "none" }}>
              <RadioGroup
                aria-label="answer"
                name={i}
                value={arr.answer}
                onChange={(e) => {
                  handleMenus(e, i);
                }}
              >
                <li style={{ display: "flex", alignItems: "flex-end" }}>
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
                <li style={{ display: "flex", alignItems: "flex-end" }}>
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
                <li style={{ display: "flex", alignItems: "flex-end" }}>
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
                <li style={{ display: "flex", alignItems: "flex-end" }}>
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
      {sucess && <Alert style={{ marginTop: "2rem" }}>Berhasil dibuat </Alert>}
      {!isEmpty(error) && (
        <Alert severity="error" style={{ marginTop: "2rem" }}>
          {error.examStudentAnswer}
        </Alert>
      )}
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
