import React, { useState } from "react";

import ButtonDanger from "../../atoms/ButtonDanger";
import ButtonRed from "../../atoms/ButtonRed";
import Dialogs from "../../atoms/Dialogs";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import parse from "html-react-parser";
import clsx from "clsx";

import color from "../../../utils/color";
import { deleteAnnouncement } from "../../../redux/actions/announcementAction";

function CardAnnouncement({
  id,
  title,
  description,
  user,
  deleteAnnouncement,
}) {
  const useStyles = makeStyles({
    description: {
      color: color.black,
    },
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
    link: {
      cursor: "pointer",
    },
  });

  const classes = useStyles();

  const [open, setOpen] = useState(false);

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

  const editDeleteIconAdmin = user.isAuthenticated.role === "admin" && (
    <div>
      <Link to={`/admin/pengumuman/${id}`}>
        <EditIcon className={clsx(classes.icon, classes.info)} />
      </Link>{" "}
      <DeleteIcon
        className={clsx(classes.icon, classes.danger, classes.link)}
        onClick={handleClickOpen}
      />
    </div>
  );

  return (
    <Grid item xs={12} md={6}>
      {editDeleteIconAdmin}
   
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
    
      <Dialogs
        open={open}
        onClose={handleClose}
        title={`Apakah anda yakin ingin menghapus ${title}`}
      >
        {" "}
        <ButtonRed handleClick={handleClose}>Batal</ButtonRed>
        <ButtonDanger handleClick={handleDeleteAnnnouncement}>Ok</ButtonDanger>
      </Dialogs>
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
