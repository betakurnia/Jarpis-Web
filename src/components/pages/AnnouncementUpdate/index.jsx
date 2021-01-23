import React, { useState, useEffect } from "react";

import Paper from "../../atoms/Paper";
import Input from "../../atoms/Input";
import ErrorSucess from "../../atoms/ErrorSucess";
import CKEditor from "../../atoms/CKEditor";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/styles/makeStyles";
import axios from "axios";
import { withRouter, useParams } from "react-router-dom";
import { connect } from "react-redux";

import proxy from "../../../utils/proxy";
import color from "../../../utils/color";
import isEmpty from "../../../utils/is-empty";
import {
  addAnnouncement,
  updateAnnouncement,
} from "../../../redux/actions/announcementAction";
import { clearErrorSucess } from "../../../redux/actions/helperAction";

function AnnouncementUpdate({
  sucess,
  error,
  addAnnouncement,
  updateAnnouncement,
  clearErrorSucess,
  history,
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

  const classes = useStyles();

  const { id } = useParams();

  const [announcement, setAnnouncement] = useState({
    title: "",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    announcement[name] = value;
    setAnnouncement({ ...announcement });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (Boolean(!id)) {
      addAnnouncement(announcement, history);
    }

    if (Boolean(id)) {
      updateAnnouncement(id, announcement, history);
    }
  };

  useEffect(() => {
    clearErrorSucess();
    if (id) {
      axios
        .get(`${proxy}/api/announcement/view/${id}`)
        .then((res) => {
          const { title, description } = res.data;

          announcement["title"] = title;
          announcement["description"] = description;

          setAnnouncement({ ...announcement });
        })
        .catch((err) => console.log(err));
    }
  }, [clearErrorSucess, id]);

  const { title } = announcement;

  return (
    <Paper title="Pengumuman">
      <form onSubmit={onSubmit}>
        <Input
          id="title"
          label="Judul"
          name="title"
          handleChange={handleChange}
          value={title}
        />
        <CKEditor value={announcement} setValue={setAnnouncement} />
        <ErrorSucess
          isSucess={sucess}
          isError={!isEmpty(error)}
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
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
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
  })(AnnouncementUpdate)
);
