import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
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

  return (
    <React.Fragment>
      <Grid item xs={12}>
        {!isTeacher && <div style={{ marginTop: "1.5rem" }}></div>}
        {isTeacher && (
          <React.Fragment>
            {" "}
            <Link to={`/guru/materi/${i}/${id}`}>
              <EditIcon className={clsx(classes.icon, classes.info)} />
            </Link>
            <DeleteIcon
              className={clsx(classes.icon, classes.danger)}
              onClick={(e) => {
                handleClickOpen(e, "delete");
              }}
            />
          </React.Fragment>
        )}
      </Grid>
      <Grid item xs={1}>
        <span className={classes.icon}> {icon}</span>
      </Grid>
      <Grid item xs={9}>
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
    </React.Fragment>
  );
}

export default TheorySection;
