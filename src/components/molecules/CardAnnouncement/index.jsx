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
import dateformat from "dateformat";

import color from "../../../utils/color";
import { deleteAnnouncementById } from "../../../api";

function CardAnnouncementNew({
  id,
  title,
  description,
  user,
  date,
  setAnnouncements,
}) {
  const useStyles = makeStyles({
    description: {
      color: color.black,
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 3,
      overflow: "hidden",
    },
    root: {
      padding: "2rem",
      backgroundColor: color.white,
      boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
      cursor: "pointer",
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
      color: color.lightDark,
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
    img: {
      maxWidth: "100%",
    },
    badge: {
      backgroundColor: color.lightDark,
      color: color.white,
      textTransform: "uppercase",
      padding: " 0.5rem",
      position: "absolute",
      bottom: 0,
      left: 0,
      fontSize: "0.875rem",
    },
  });

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleDeleteAnnnouncement = async (e) => {
    const announcements = await deleteAnnouncementById(id);
    setAnnouncements([...announcements]);
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
    <Grid item xs={12} md={8}>
      {editDeleteIconAdmin}
      <Link to={`/pengumuman/${id}`}>
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <div style={{ position: "relative" }}>
                <img
                  src="/majors/math.svg"
                  alt="math"
                  className={classes.img}
                />
                <span className={classes.badge}>
                  {dateformat(date, "mmmm d, yyyy")}
                </span>
              </div>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" component="h3" className={classes.title}>
                {title}
              </Typography>
              <Typography
                varian="body1"
                component="p"
                className={classes.description}
              >
                {parse(description)}
              </Typography>
            </Grid>
          </Grid>{" "}
        </div>
      </Link>
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
});

export default connect(mapStateToProps)(CardAnnouncementNew);
