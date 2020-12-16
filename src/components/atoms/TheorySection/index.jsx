import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import color from "../../../utils/color";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AssignmentIcon from "@material-ui/icons/Assignment";
import axios from "axios";

function TheorySection({
  description,
  icon,
  title,
  isLink,
  id,
  isStudent,
  majorName,
  children,
  i,
  handleDelete,
  isTeacher,
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

  const handleClose = () => {
    setOpen2(false);
  };

  const handleClose2 = (e) => {
    handleDelete(e, i, id);
    setOpen2(false);
  };

  return (
    <React.Fragment>
      <Grid item xs={12}>
        {!isTeacher && <div style={{ marginTop: "1.5rem" }}></div>}
        {isTeacher && (
          <React.Fragment>
            {" "}
            <Link to={`/guru/materi/${i}/${id}`}>
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
        <Grid item xs={3} md={1}>
          <span className={classes.icon}> {icon}</span>
        </Grid>
        <Grid item xs={9} md={10.5}>
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
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default TheorySection;
