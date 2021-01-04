import React from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/styles/makeStyles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import Input from "../../atoms/Input";
import ErrorSucess from "../../atoms/ErrorSucess";

import {
  addAnnouncement,
  updateAnnouncement,
} from "../../../redux/actions/announcementAction";
import { clearErrorSucess } from "../../../redux/actions/helperAction";
import proxy from "../../../utils/proxy";
import color from "../../../utils/color";
import isEmpty from "../../../utils/is-empty";

function CKEditors({
  addAnnouncement,
  titles,
  id,
  updateAnnouncement,
  sucess,
  clearErrorSucess,
  history,
  error,
}) {
  const useStyles = makeStyles({
    btn: {
      marginTop: "2rem",
    },
    alert: {
      marginTop: "1.5rem",
    },
    formControl: {
      marginTop: "1.5rem",
    },
    label: {
      color: color.label,
    },
  });

  const [announcement, setAnnouncement] = React.useState({
    title: "",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  });

  const handleAnnouncement = (e, name) => {
    announcement[name] = e.target.value;
    setAnnouncement({ ...announcement });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateAnnouncement(id, announcement, history);
    } else {
      addAnnouncement(announcement, history);
    }
  };

  const classes = useStyles();

  React.useEffect(() => {
    clearErrorSucess();
    if (id) {
      axios
        .get(`${proxy}/api/announcement/view/${id}`)
        .then((res) => {
          announcement["title"] = res.data.title;
          announcement["description"] = res.data.description;

          setAnnouncement({ ...announcement });
        })
        .catch((err) => console.log(err));
    }
  }, [clearErrorSucess, id]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Input
          id="title"
          label="Judul"
          placeholder=""
          handleChange={handleAnnouncement}
          value={announcement.title}
        />
        <div className={classes.formControl}>
          <label className={classes.label}>Deskripsi</label>
          <div style={{ marginTop: "0.5rem" }}></div>
          <CKEditor
            editor={ClassicEditor}
            data={announcement.description}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ data });
              announcement["description"] = data;
              setAnnouncement(announcement);
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </div>
        <ErrorSucess
          isSucess={Boolean(sucess)}
          isError={!isEmpty(error)}
          // sucessMessage={"data pengumuman sukses"}
          errorMessages={[error.title, error.description]}
        />
        <Grid container justify="center">
          <Grid item xs={12} md={4}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.btn}
            >
              {titles}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  sucess: state.sucess,
  error: state.error,
});

export default withRouter(
  connect(mapStateToProps, {
    addAnnouncement,
    updateAnnouncement,
    clearErrorSucess,
  })(CKEditors)
);
