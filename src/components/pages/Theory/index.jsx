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
import Alert from "@material-ui/lab/Alert";
import Input from "../../atoms/Input";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import proxy from "../../../utils/proxy";
import isEmpty from "../../../utils/is-empty";
import { useDispatch } from "react-redux";
import { SET_SUCESS, GET_ERRORS } from "../../../redux/actions";
import { connect } from "react-redux";

function Pengumuman({ sucess, error }) {
  const { i, id } = useParams();

  const [tipes, setTipes] = React.useState([]);

  const [theory, setTheory] = React.useState({
    numberOfTheory: i,
    description: "",
    file: "",
    fileName: "upload materi",
  });

  const handleFile = (e) => {
    console.log(e.target.files[0]);
    theory["file"] = e.target.files[0];
    theory["fileName"] = e.target.files[0].name;
    setTheory({ ...theory });
    console.log(theory);
  };

  const handleChange = (e) => {
    theory["description"] = e.target.value;
    setTheory({ ...theory });
  };

  const useStyles = makeStyles((theme) => ({
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
      .then((res) => {
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
      .get(`${proxy}/api/theorys/view/${i}/${id}`)
      .then((res) => {
        if (res.data) {
          setTheory({ ...res.data });
        } else {
          setTheory({
            numberOfTheory: i,
            description: "",
            file: "",
            fileName: "upload materi",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [i, id]);

  return (
    <CreateTemplate title={`Materi ke ${i}`}>
      <div
        style={{
          paddingBottom: "2rem",
          borderBottom: `0.05px solid #bdbdbd`,
        }}
      ></div>
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <TheoryTemplate title="Tugas" icon={<AssignmentIcon />}>
          <Input
            id="description"
            label="Deskripsi"
            value={theory.description}
            handleChange={handleChange}
          />
        </TheoryTemplate>
        <TheoryTemplate title="Materi">
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
        </TheoryTemplate>
        {tipes.map(({ tipe }) => (
          <React.Fragment>
            <TheoryTemplate title={tipe}></TheoryTemplate>
          </React.Fragment>
        ))}
        {!isEmpty(error) && (
          <Alert className={classes.alert} severity="error">
            {error.description || error.file}
          </Alert>
        )}
        {sucess && (
          <Alert className={classes.alert}> Materi berhasil dibuat</Alert>
        )}
        <FormLabel component="legend" style={{ marginTop: "2rem" }}></FormLabel>

        <Grid container justify="center">
          <Grid item xs={12} md={4}>
            <Button
              color="primary"
              variant="contained"
              style={{ marginTop: "0.5rem" }}
              fullWidth
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </CreateTemplate>
  );
}

const mapStateToProps = (state) => ({
  error: state.error,
  sucess: state.sucess,
});

export default connect(mapStateToProps)(Pengumuman);
