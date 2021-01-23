import React, { useState } from "react";

import ButtonDanger from "../../atoms/ButtonDanger";
import ButtonRed from "../../atoms/ButtonRed";
import Dialogs from "../../atoms/Dialogs";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/styles/makeStyles";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import axios from "axios";
import fileDownload from "js-file-download";
import clsx from "clsx";

import proxy from "../../../utils/proxy";
import color from "../../../utils/color";

function TheorySection({
  icon,
  title,
  id,
  description,
  fileName,
  numberOfTheory,
  handleDelete,
  isTeacher,
}) {
  const useStyles = makeStyles({
    link: {
      cursor: "pointer",
    },
    description: {
      color: color.grey,
    },
    icon: {
      padding: "1rem",

      backgroundColor: color.white,
    },
    info: {
      color: color.info,
    },
    danger: {
      color: color.danger,
    },
    btnInfo: { backgroundColor: color.danger, color: color.white },
    btnDanger: { backgroundColor: color.white, color: color.danger },
    download: {
      padding: "0 0.5rem",
      cursor: "pointer",
    },
  });

  const classes = useStyles();

  const [openTeacher, setOpenTeacher] = useState(false);

  const handleClickOpen = () => {
    setOpenTeacher(true);
  };

  const handleDeleteExam = () => {
    handleDelete(numberOfTheory, id);
    setOpenTeacher(false);
  };

  const handleCloseTeacher = () => {
    setOpenTeacher(false);
  };

  const editDeleteIconTeacher = isTeacher && (
    <div>
      <Link to={`/guru/materi/${numberOfTheory}/${id}`}>
        <EditIcon className={clsx(classes.icon, classes.info)} />
      </Link>{" "}
      <DeleteIcon
        className={clsx(classes.icon, classes.danger, classes.link)}
        onClick={handleClickOpen}
      />
    </div>
  );

  const handleDownload = (e) => {
    e.preventDefault();
    axios
      .get(`${proxy}/api/theorys/download?filename=${fileName}`)
      .then((data) => {
        fileDownload(data, `${fileName}`);
      })
      .catch((err) => console.log("error"));
  };

  return (
    <div>
      {editDeleteIconTeacher}
      <Grid container spacing={3}>
        <span className={classes.icon}> {icon}</span>
        <div>
          <Typography variant="h6" component="p">
            {title}
          </Typography>
          <Grid
            container
            alignItems="flex-end"
            style={{ paddingTop: "0.25rem" }}
          >
            <AssignmentIcon />{" "}
            <span className={classes.description}>{description}</span>
          </Grid>
          <Grid
            container
            alignItems="flex-end"
            style={{ paddingTop: "0.75rem" }}
          >
            <SystemUpdateAltIcon />{" "}
            <span onClick={handleDownload}>Download {fileName}</span>
          </Grid>
        </div>
      </Grid>
      <Dialogs
        open={openTeacher}
        handleClose={handleCloseTeacher}
        title={`Apakah anda yakin ingin mengapus ${title}`}
      >
        <ButtonRed handleClick={handleCloseTeacher}>Batal</ButtonRed>
        <ButtonDanger handleClick={handleDeleteExam}>Ok</ButtonDanger>
      </Dialogs>
    </div>
  );
}

export default TheorySection;
