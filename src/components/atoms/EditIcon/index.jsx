import React from "react";

import Edit from "@material-ui/icons/Edit";
import makeStyles from "@material-ui/styles/makeStyles";
import { Link } from "react-router-dom";
import clsx from "clsx";

import color from "../../../utils/color";

function EditIcon({ href }) {
  const useStyles = makeStyles({
    icon: {
      padding: "1rem",
      backgroundColor: color.white,
    },
    info: {
      color: color.info,
    },
  });

  const classes = useStyles();

  return (
    <Link to={href}>
      <Edit className={clsx(classes.icon, classes.info)} />
    </Link>
  );
}

export default EditIcon;
