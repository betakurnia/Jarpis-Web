import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import clsx from "clsx";

import color from "../../../utils/color";

function TheorySection({
  icon,
  title,
  isLink,
  id,
  isStudent,
  children,
  i,
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

  const [open, setOpen] = React.useState(false);

  const [open2, setOpen2] = React.useState(false);

  const handleClose = () => {
    setOpen2(false);
  };

  const handleClose2 = (e) => {
    handleDelete(e, i, id);
    setOpen2(false);
  };

  const handleClickOpen = (e, isDelete) => {
    if (isDelete === "delete") {
      handleDelete();
      setOpen2(true);
    } else {
      setOpen(true);
    }
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
              handleClickOpen(e, "delete");
            }}
          />
        </React.Fragment>
      )}
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <span className={classes.icon}> {icon}</span>
        </Grid>
        <Grid item xs={10}>
          {isLink ? (
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
          ) : (
            <Typography variant="h6" component="p">
              {title}
            </Typography>
          )}

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
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah anda yakin ingin mengikuti ujian?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            style={{ backgroundColor: "#28a745", color: "#ffffff" }}
          >
            <Link to={`/guru/materi/1/${title}${i}/${id}`}>Ya</Link>
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
            autoFocus
            style={{ backgroundColor: "#ffffff", color: "#dc3545" }}
          >
            Tidak
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open2}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah anda yakin ingin mengapus {title}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            style={{ color: "#dc3545" }}
          >
            Batal
          </Button>
          <Button
            onClick={handleClose2}
            color="primary"
            autoFocus
            style={{ backgroundColor: "#dc3545", color: "#ffffff" }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default TheorySection;
