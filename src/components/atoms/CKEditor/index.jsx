import React from "react";

import makeStyles from "@material-ui/styles/makeStyles";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import color from "../../../utils/color";

function CKEditors({ setValue, value }) {
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
    ckEditor: {
      marginTop: "0.5rem",
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.formControl}>
      <label className={classes.label}>Deskripsi</label>
      <div className={classes.ckEditor}>
        <CKEditor
          editor={ClassicEditor}
          data={value}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();

            setValue(data);
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    </div>
  );
}

export default CKEditors;
