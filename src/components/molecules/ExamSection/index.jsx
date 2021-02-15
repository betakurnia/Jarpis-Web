import React, { useState } from "react";

import ButtonDanger from "../../atoms/ButtonDanger";
import ButtonRed from "../../atoms/ButtonRed";
import ButtonInfo from "../../atoms/ButtonInfo";
import EditIcon from "../../atoms/EditIcon";
import DeleteIcon from "../../atoms/DeleteIcon";
import Dialogs from "../../atoms/Dialogs";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import { withRouter } from "react-router-dom";

import color from "../../../utils/color";
import { formatTitle } from "../../../utils/format";

function ExamSection({
  id,
  description,
  icon,
  isStudent,
  isTeacher,
  title,
  type,
  history,
  handleDelete,
}) {
  const useStyles = makeStyles({
    alert: { marginBottom: "1.5rem" },
    description: {
      color: color.grey,
    },
    link: {
      cursor: "pointer",
    },
    icon: {
      padding: "1rem",
      backgroundColor: color.white,
    },
    btnInfo: { backgroundColor: color.danger, color: color.white },
    btnDanger: { backgroundColor: color.white, color: color.danger },
  });

  const classes = useStyles();

  const [openExam, setOpenExam] = useState(false);

  const [openTeacher, setOpenTeacher] = useState(false);

  const handleClickTeacher = () => {
    setOpenTeacher(true);
  };

  const handleClickOpenExam = () => {
    setOpenExam(true);
  };

  const handleCloseExam = () => {
    setOpenExam(false);
  };

  const handleDeleteExam = () => {
    handleDelete(id, type);
    setOpenTeacher(false);
  };

  const handleCloseTeacher = () => {
    setOpenTeacher(false);
  };

  const ableExamStudent = isStudent ? (
    <Typography
      variant="h6"
      component="p"
      className={classes.link}
      onClick={handleClickOpenExam}
    >
      {formatTitle(title)}
    </Typography>
  ) : (
    <Typography variant="h6" component="p">
      {formatTitle(title)}
    </Typography>
  );

  const editDeleteIconTeacher = isTeacher ? (
    <div>
      <EditIcon href={`/guru/ujian/${type}/${id}`} />
      <DeleteIcon handleClick={handleClickTeacher} />
    </div>
  ) : (
    <div style={{ marginTop: "1.5rem" }}></div>
  );

  return (
    <div>
      {editDeleteIconTeacher}

      <Grid container spacing={2}>
        <span className={classes.icon}> {icon}</span>

        <div>
          {ableExamStudent}
          <Typography
            variant="body1"
            component="p"
            className={classes.description}
          >
            {description}
          </Typography>
        </div>
        <Dialogs
          open={openExam}
          handleClose={handleCloseExam}
          title="Apakah anda yakin ingin mengikuti ujian ?"
        >
          {" "}
          <ButtonRed handleClick={handleCloseExam}>Tidak</ButtonRed>
          <ButtonInfo
            handleClick={(e) => {
              history.push(`/mata-pelajaran/${title}/${id}`);
              handleCloseExam(e);
            }}
          >
            Ya
          </ButtonInfo>
        </Dialogs>

        <Dialogs
          open={openTeacher}
          handleClose={handleCloseTeacher}
          title={`Apakah anda yakin ingin mengapus ${title}`}
        >
          <ButtonRed handleClick={handleCloseTeacher}>Batal</ButtonRed>
          <ButtonDanger handleClick={handleDeleteExam}>Ok</ButtonDanger>
        </Dialogs>
      </Grid>
    </div>
  );
}

export default withRouter(ExamSection);
