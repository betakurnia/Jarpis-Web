import React, { useState, useEffect } from "react";

import Paper from "../../atoms/Paper";
import Input from "../../atoms/Input";
import ErrorSucess from "../../atoms/ErrorSucess";
import CKEditor from "../../atoms/CKEditor";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/styles/makeStyles";
import { withRouter, useParams } from "react-router-dom";

import color from "../../../utils/color";
import isEmpty from "../../../utils/is-empty";
import {
  addAnnouncement,
  updateAnnouncement,
  viewAnnouncementById,
} from "../../../api/";

function AnnouncementUpdate({ history }) {
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
  });

  const [description, setDescription] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
  );

  const [errors, setErrors] = useState([]);

  const { title } = announcement;

  const handleChange = (e) => {
    const { name, value } = e.target;

    announcement[name] = value;
    setAnnouncement({ ...announcement });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (Boolean(!id)) {
      const { errors } = await addAnnouncement(history, {
        title: announcement.title,
        description: description,
      });
      setErrors({ ...errors });
    }

    if (Boolean(id)) {
      const { errors } = await updateAnnouncement(history, id, {
        title: announcement.title,
        description: description,
      });
      setErrors({ ...errors });
    }
  };

  useEffect(() => {
    async function fetchApi() {
      const announcement = await viewAnnouncementById(id);

      setDescription(announcement.description);

      setAnnouncement({ ...announcement });
    }

    if (id) {
      fetchApi();
    }
  }, [id]);

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
        <CKEditor value={description} setValue={setDescription} />
        <ErrorSucess
          isError={!isEmpty(errors)}
          errorMessages={[errors.title, errors.description]}
        />
        <Grid container justify="center">
          <Grid item xs={12} md={4}>
            <Button
              type="submit"
              variant="contained"
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

export default withRouter(AnnouncementUpdate);
