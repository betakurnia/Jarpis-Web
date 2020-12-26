import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/styles/makeStyles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import color from "../../../utils/color";

function ExakSection({
  description,
  icon,
  id,
  i,
  isStudent,
  isTeacher,
  majorName,
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
      width: "100%",
      padding: "1rem",
      cursor: "pointer",
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

  const handleClickOpen = (e, isDelete) => {
    if (isDelete === "delete") {
      setOpen2(true);
    } else {
      setOpen(true);
    }
  };

  const handleClose = (e, status) => {
    setOpen(false);
    if (status === "yes") {
      history.push(`/mata-pelajaran/${title}${majorName}/${id}`);
    }
  };

  const handleClose2 = () => {
    handleDelete(id, type);
    setOpen2(false);
  };

  const handleClose3 = () => {
    setOpen2(false);
  };

  return (
    <React.Fragment>
      <Grid item xs={12}>
        {!isStudent && i === 0 && (
          <Alert severity="warning">Ujian hanya tersedia untuk siswa</Alert>
        )}

        {isTeacher && (
          <React.Fragment>
            <Link to={`/guru/ujian/${title}/${id}`}>
              <EditIcon clasName={(classes.icon, classes.info)} />
            </Link>
            <DeleteIcon
              clasName={(classes.icon, classes.danger)}
              onClick={(e) => {
                handleClickOpen(e, "delete");
              }}
            />
          </React.Fragment>
        )}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={4} md={2}>
          <span className={classes.icon}> {icon}</span>
        </Grid>

        <Grid item xs={8} md={10}>
          {isStudent ? (
            <Link to={`/mata-pelajaran/${title}/${id}`}>
              <Typography variant="h6" component="p">
                {title.split("-").join(" ")}
              </Typography>
            </Link>
          ) : (
            <Typography variant="h6" component="p">
              {title.split("-").join(" ")}
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
            open={open}
            onClose={handleClose}
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Apakah anda yakin ingin mengikuti ujian?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={(e) => {
                  handleClose(e, "yes");
                }}
                color="primary"
                className={classes.btnInfo}
              >
                Ya
              </Button>
              <Button
                onClick={handleClose}
                color="primary"
                autoFocus
                className={classes.btnDanger}
              >
                Tidak
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={open2}
            onClose={handleClose}
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Apakah anda yakin ingin mengapus {title}?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose3}
                color="primary"
                className={classes.danger}
              >
                Batal
              </Button>
              <Button
                onClick={handleClose2}
                color="primary"
                autoFocus
                className={classes.btnInfo}
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default withRouter(ExakSection);
