import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import color from "../../../utils/color";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function Section({
  description,
  icon,
  title,
  isLink,
  id,
  isStudent,
  majorName,
  handleDelete,
  history,
  type,
  isTeacher,
  i,
}) {
  const useStyles = makeStyles({
    icon: {
      width: "100%",
    },
    link: {
      cursor: "pointer",
    },
    description: {
      color: "#424242",
    },
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

  const handleClose = (e, a) => {
    setOpen(false);
    if (a == "a") {
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
          <React.Fragment>
            <Alert
              severity="warning"
              style={{ marginTop: "0", marginBottom: "1.5rem" }}
            >
              Ujian hanya tersedia untuk siswa
            </Alert>{" "}
          </React.Fragment>
        )}
        {isTeacher && (
          <React.Fragment>
            <Link to={`/guru/ujian/${title}/${id}`}>
              <EditIcon
                style={{
                  color: "green",
                  padding: "1rem",
                  cursor: "pointer",
                  backgroundColor: color.white,
                }}
              />
            </Link>
            <DeleteIcon
              style={{
                color: "#dc3545",
                padding: "1rem",
                cursor: "pointer",
                backgroundColor: color.white,
              }}
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
          {isLink ? (
            <React.Fragment>
              {isStudent ? (
                <Link to={`/mata-pelajaran/${title}/${id}`}>
                  <Typography variant="h6" component="p">
                    {title}a
                  </Typography>
                </Link>
              ) : (
                <React.Fragment>
                  <Typography variant="h6" component="p">
                    {title}
                  </Typography>
                </React.Fragment>
              )}
            </React.Fragment>
          ) : (
            <Link to={`/mata-pelajaran/${title}/${id}`}>
              <Typography variant="h6" component="p">
                {title}a
              </Typography>
            </Link>
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
                onClick={(e) => {
                  handleClose(e, "a");
                }}
                color="primary"
                style={{ backgroundColor: "#28a745", color: "#ffffff" }}
              >
                Ya
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
                onClick={handleClose3}
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
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default withRouter(Section);
