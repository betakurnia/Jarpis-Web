import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import clsx from "clsx";

import ButtonDanger from "../../atoms/ButtonDanger";
import ButtonRed from "../../atoms/ButtonRed";

import color from "../../../utils/color";

function TheorySection({
  icon,
  title,
  id,
  isStudent,
  children,
  i,
  type,
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
  });

  const classes = useStyles();

  const [openTeacher, setOpenTeacher] = React.useState(false);

  const handleClickOpen = () => {
    setOpenTeacher(true);
  };

  const handleDeleteExam = () => {
    handleDelete(i, id);
    setOpenTeacher(false);
  };

  const handleCloseTeacher = () => {
    setOpenTeacher(false);
  };

  return (
    <React.Fragment>
      {isTeacher && (
        <React.Fragment>
          <Link to={`/guru/materi/${i}/${id}`}>
            <EditIcon className={clsx(classes.icon, classes.info)} />
          </Link>{" "}
          <DeleteIcon
            className={clsx(classes.icon, classes.danger, classes.link)}
            onClick={(e) => {
              handleClickOpen();
            }}
          />
        </React.Fragment>
      )}
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <span className={classes.icon}> {icon}</span>
        </Grid>
        <Grid item xs={10}>
          <React.Fragment>
            {isStudent ? (
              <Typography variant="h6" component="p">
                {title}
              </Typography>
            ) : (
              <React.Fragment>
                <Typography variant="h6" component="p">
                  {title}
                </Typography>
              </React.Fragment>
            )}
          </React.Fragment>

          <Typography
            variant="body1"
            component="p"
            className={classes.description}
          >
            {children}
          </Typography>
        </Grid>
      </Grid>
      <Dialog
        open={openTeacher}
        onClose={handleCloseTeacher}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah anda yakin ingin mengapus {title}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonRed handleClick={handleCloseTeacher}>Batal</ButtonRed>
          <ButtonDanger handleClick={handleDeleteExam}>Ok</ButtonDanger>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default TheorySection;
