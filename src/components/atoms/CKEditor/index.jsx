import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Input from "../Input";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import {
  addAnnouncement,
  updateAnnouncement,
} from "../../../redux/actions/announcementAction";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import proxy from "../../../utils/proxy";

function CKEditors({ addAnnouncement, titles, id, updateAnnouncement }) {
  const useStyles = makeStyles({
    btn: {
      marginTop: "2rem",
    },
  });

  const [announcement, setAnnouncement] = React.useState({
    title: "",
    description: "",
  });

  const handleAnnouncement = (e, name) => {
    announcement[name] = e.target.value;
    setAnnouncement({ ...announcement });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      console.log("a");
      updateAnnouncement(id, announcement);
    } else {
      addAnnouncement(announcement);
    }
  };

  const classes = useStyles();

  React.useEffect(() => {
    axios
      .get(`${proxy}/api/announcement/view/${id}`)
      .then((res) => {
        announcement["title"] = res.data.title;
        announcement["description"] = res.data.description;

        setAnnouncement({ ...announcement });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Input
          id="title"
          label="Judul"
          placeholder="Title"
          handleChange={handleAnnouncement}
          value={announcement.title}
        />
        <div style={{ marginTop: "1.5rem" }}>
          <label>Deskripsi</label>
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
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          fullWidth
          className={classes.btn}
        >
          {titles}
        </Button>
      </form>
    </div>
  );
}

export default connect(null, { addAnnouncement, updateAnnouncement })(
  CKEditors
);
