import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Input from "../Input";
import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { connect } from "react-redux";
import {
  addAnnouncement,
  updateAnnouncement,
  clearErrorSucess,
} from "../../../redux/actions/announcementAction";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import proxy from "../../../utils/proxy";
import isEmpty from "../../../utils/is-empty";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

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
  }, []);

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
        <div style={{ marginTop: "1.5rem" }}>
          <label style={{ color: "rgba(0, 0, 0, 0.54)" }}>Deskripsi</label>
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
        {sucess && (
          <Alert className={classes.alert}>
            {titles} data pengumuman sukses
          </Alert>
        )}
        {!isEmpty(error) && (
          <Alert className={classes.alert} severity="error">
            {error.title || error.description}
          </Alert>
        )}
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
