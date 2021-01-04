import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Alert from "@material-ui/lab/Alert";
import makeStyles from "@material-ui/styles/makeStyles";
import { withRouter } from "react-router-dom";

import ButtonInfo from "../../atoms/ButtonInfo";
import ButtonRed from "../../atoms/ButtonRed";
import ButtonDanger from "../../atoms/ButtonDanger";
import EditIcon from "../../atoms/EditIcon";
import DeleteIcon from "../../atoms/DeleteIcon";

import color from "../../../utils/color";

function ExakSection({
  description,
  icon,
  id,
  i,
  isStudent,
  isTeacher,
  title,
  type,
  history,
  handleDelete,
}) {
  const useStyles = makeStyles({
    alert: { marginTop: "0", marginBottom: "1.5rem" },
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

  const [openExam, setOpenExam] = React.useState(false);

  const [openTeacher, setOpenTeacher] = React.useState(false);

  const handleClickTeacher = () => {
    setOpenTeacher(true);
  };

  const handleClickOpenExam = () => {
    setOpenExam(true);
  };

  const handleCloseExam = (e, status) => {
    setOpenExam(false);
    if (status === "yes") {
      history.push(`/mata-pelajaran/${title}/${id}`);
    }
  };

  const handleDeleteExam = () => {
    handleDelete(id, type);
    setOpenTeacher(false);
  };

  const handleCloseTeacher = () => {
    setOpenTeacher(false);
  };

  return (
    <React.Fragment>
      {!isStudent && i === 0 && (
        <Alert severity="warning" className={classes.alert}>
          Ujian hanya tersedia untuk siswa
        </Alert>
      )}

      {isTeacher ? (
        <React.Fragment>
          <EditIcon href={`/guru/ujian/${type}/${id}`} />
          <DeleteIcon handleClick={handleClickTeacher} />
        </React.Fragment>
      ) : (
        <div style={{ marginTop: "1.5rem" }}></div>
      )}

      <Grid container spacing={2}>
        <Grid item xs={4} md={2}>
          <span className={classes.icon}> {icon}</span>
        </Grid>

        <Grid item xs={8} md={10}>
          {isStudent ? (
            <Typography
              variant="h6"
              component="p"
              className={classes.link}
              onClick={handleClickOpenExam}
            >
              {title.split("-")[0]}
            </Typography>
          ) : (
            <Typography variant="h6" component="p">
              {title.split("-")[0]}
            </Typography>
          )}

          <Typography
            variant="body1"
            component="p"
            className={classes.description}
          >
            {description}
          </Typography>

          <Dialog
            open={openExam}
            onClose={handleCloseExam}
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Apakah anda yakin ingin mengikuti ujian?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <ButtonRed handleClick={handleCloseExam}>Tidak</ButtonRed>
              <ButtonInfo
                handleClick={(e) => {
                  handleCloseExam(e, "yes");
                }}
              >
                Ya
              </ButtonInfo>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openTeacher}
            onClose={handleCloseTeacher}
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Apakah anda yakin ingin mengapus {title}?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <ButtonRed handleClick={handleCloseTeacher}>Batal</ButtonRed>
              <ButtonDanger
                handleClick={handleDeleteExam}
                className={classes.btnInfo}
              >
                Ok
              </ButtonDanger>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default withRouter(ExakSection);
