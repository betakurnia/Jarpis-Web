import React, { useState, useEffect } from "react";

import Input from "../../atoms/Input";
import Paper from "../../atoms/Paper";
import ExamIcon from "../../atoms/ExamIcon";
import Sub from "../../atoms/Sub";
import ErrorSucess from "../../atoms/ErrorSucess";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AssignmentIcon from "@material-ui/icons/Assignment";
import makeStyles from "@material-ui/styles/makeStyles";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";

import isEmpty from "../../../utils/is-empty";
import proxy from "../../../utils/proxy";
import { SET_SUCESS, GET_ERRORS } from "../../../redux/actions";

function Pengumuman({ sucess, error }) {
  const { numberOfTheory, id } = useParams();

  // const [tipes] = useState([]);

  const [theory, setTheory] = useState({
    numberOfTheory: numberOfTheory,
    description: "",
    file: "",
    fileName: "upload materi",
  });

  const handleFile = (e) => {
    theory["file"] = e.target.files[0];
    theory["fileName"] = e.target.files[0].name;
    setTheory({ ...theory });
  };

  const handleChange = (e) => {
    theory["description"] = e.target.value;
    setTheory({ ...theory });
  };

  const useStyles = makeStyles(() => ({
    root: {
      marginTop: "1.5rem",
      "& > *": {
        margin: "0.5rem",
      },
    },
    input: {
      display: "none",
    },
    alert: {
      marginTop: "1.5rem",
    },
    img: {
      width: "100%",
      height: 200,
    },
  }));

  const classes = useStyles();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const file = new FormData();

    file.append("file", theory.file);
    file.append("fileName", theory.fileName);
    file.append("description", theory.description);
    file.append("numberOfTheory", theory.numberOfTheory);
    file.append("majorId", id);

    axios
      .post(`${proxy}/api/theorys/create`, file)
      .then(() => {
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        dispatch({ type: SET_SUCESS, payload: false });
        dispatch({ type: GET_ERRORS, payload: err.response.data });
      });
  };

  // const tipeCards = tipes.map(({ tipe }) => <TheoryTemplate title={tipe} />);

  useEffect(() => {
    // Need refactor
    window.scrollTo(0, 0);
    axios
      .get(`${proxy}/api/theorys/view/${numberOfTheory}/${id}`)
      .then((res) => {
        if (res.data) {
          setTheory({ ...res.data });
        } else {
          setTheory({
            numberOfTheory: numberOfTheory,
            description: "",
            file: "",
            fileName: "upload materi",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [numberOfTheory, id]);

  return (
    <Paper title={`Materi ke ${numberOfTheory}`}>
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <Sub title="Tugas" icon={<AssignmentIcon />}>
          <Input
            id="description"
            label="Deskripsi"
            value={theory.description}
            handleChange={handleChange}
          />
        </Sub>
        <Sub title="Materi" icon={<ExamIcon />}>
          <Button>
            <div className={classes.root}>
              <input
                accept="application/pdf, application/vnd.ms-excel"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                name="file"
                onChange={(e) => {
                  handleFile(e);
                }}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="secondary" component="span">
                  {theory.fileName}
                </Button>
              </label>
            </div>
          </Button>
        </Sub>
        {/* {tipeCards} */}
        <ErrorSucess
          isError={!isEmpty(error)}
          isSucess={Boolean(sucess)}
          errorMessages={[error.description, error.file]}
        />
        <Grid container justify="center">
          <Grid item xs={12} md={4}>
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              type="submit"
              style={{ marginTop: "1.5rem" }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  error: state.error,
  sucess: state.sucess,
});

export default connect(mapStateToProps)(Pengumuman);
