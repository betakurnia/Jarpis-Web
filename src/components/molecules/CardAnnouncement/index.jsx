import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import color from "../../../utils/color";
import parse from "html-react-parser";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import { deleteAnnouncement } from "../../../redux/actions/announcementAction";
import { useParams, Link } from "react-router-dom";

function CardAnnouncement({
  id,
  title,
  description,
  user,
  deleteAnnouncement,
  sucess,
}) {
  const useStyles = makeStyles({
    root: {
      backgroundColor: color.white,
      boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
    },
    header: {
      backgroundColor: color.primary,
      padding: "1rem",
      borderTopLeftRadius: "0.5rem",
      borderTopRightRadius: "0.5rem",
    },
    body: {
      padding: "1rem",
      backgroundColor: color.white,
      borderBottomLeftRadius: "0.5rem",
      borderBottomRightRadius: "0.5rem",
    },
    title: {
      color: color.white,
    },
    description: {
      color: color.black,
    },
  });

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleDeleteAnnnouncement = (e) => {
    deleteAnnouncement(id);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item xs={12} md={6}>
      {user.isAuthenticated.role === "admin" && (
        <React.Fragment>
          <Link to={`/admin/pengumuman/${id}`}>
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
            onClick={handleClickOpen}
          />
        </React.Fragment>
      )}

      <div className={classes.root}>
        <div className={classes.header}>
          <Typography varian="body1" component="h2" className={classes.title}>
            {title}
          </Typography>
        </div>
        <div className={classes.body}>
          <Typography
            varian="body1"
            component="p"
            className={classes.description}
          >
            {parse(description)}
          </Typography>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah anda yakin ingin menghapus {title} ?
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
            onClick={handleDeleteAnnnouncement}
            style={{ backgroundColor: "#dc3545", color: color.white }}
            autoFocus
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  sucess: state.sucess,
});

export default connect(mapStateToProps, {
  deleteAnnouncement,
})(CardAnnouncement);
