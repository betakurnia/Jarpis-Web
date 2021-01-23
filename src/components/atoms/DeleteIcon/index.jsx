import React from "react";

import Delete from "@material-ui/icons/Delete";
import makeStyles from "@material-ui/styles/makeStyles";
import clsx from "clsx";

import color from "../../../utils/color";

function DeleteIcon({ handleClick }) {
  const useStyles = makeStyles({
    icon: {
      padding: "1rem",
      backgroundColor: color.white,
      cursor: "pointer",
    },
    danger: {
      color: color.danger,
    },
  });

  const classes = useStyles();

  return (
    <Delete
      className={clsx(classes.icon, classes.danger)}
      onClick={handleClick}
    />
  );
}

export default DeleteIcon;
