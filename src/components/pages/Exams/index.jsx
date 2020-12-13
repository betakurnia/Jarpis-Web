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

function Exams() {
  const [role, setRole] = React.useState("5");
  // const [arrLen, setArrLen] = React.useState([...new Array(20)]);

  const [loading, setLoading] = React.useState(true);

  const [exam, setExam] = React.useState([...new Array(5)]);

  const { ujian } = useParams();

  const handleMenu = (e) => {
    setRole(e.target.value);
    setExam([...new Array(Number(e.target.value))]);
  };

  const handleMenus = (e, i) => {
    exam[i].answer = e.target.value;
    setExam([...exam]);
    console.log(exam);
  };

  const [tipes, setTipes] = React.useState([]);

  const handleTipe = (e, val) => {
    tipes.push({
      tipe: val,
    });
    setTipes([...tipes]);
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
    exam.forEach((a, i) => {
      let obj = {
        examName: "",
        possibilitesAnswer: ["", "", "", ""],
        answer: "",
      };
      exam[i] = obj;
    });
    setExam([...exam]);
    setLoading(false);
  }, []);

  const handleSubmit = () => {
    axios
      .post(`${proxy}/api/exams/create`, {
        question: exam,
        type: ujian,
      })
      .then((exam) => {
        console.log("Sucess");
      });
  };

  return (
    <CreateTemplate title={`Ujian ${ujian}`}>
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

      <FormLabel component="legend" style={{ marginTop: "2rem" }}></FormLabel>
      <Typography variant="h5" component="p" style={{ paddingRight: "2rem" }}>
        Jumlah Soal
      </Typography>
      <RadioGroup
        aria-label="gender"
        name="Role"
        value={role}
        onChange={handleMenu}
        row
      >
        <FormControlLabel value="5" control={<Radio />} label={`5`} />
        <FormControlLabel value="10" control={<Radio />} label="10" />
        <FormControlLabel value="20" control={<Radio />} label="20" />
      </RadioGroup>
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
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          {" "}
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
    </CreateTemplate>
  );
}

export default Exams;
