import React from "react";

import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

import color from "../../../utils/color";

function Badge({ status }) {
  const useStyles = makeStyles({
    badge: {
      padding: "0.5rem 1rem",
      color: color.white,
      borderRadius: "0.5rem",
    },
    bgInfo: {
      backgroundColor: color.info,
    },
    bgDanger: {
      backgroundColor: color.danger,
    },
    bgWarning: {
      backgroundColor: color.warning,
    },
  });

  const classes = useStyles();

  switch (status) {
    case "Hadir":
      return <span className={clsx(classes.bgInfo, classes.badge)}>Hadir</span>;
    case "Tidak Hadir":
      return (
        <span className={clsx(classes.bgDanger, classes.badge)}>
          Tidak Hadir
        </span>
      );
    case "Sakit":
      return (
        <span className={clsx(classes.bgWarning, classes.badge)}>Sakit</span>
      );
    default:
      return (
        <span className={clsx(classes.badge, classes.badge)}>{status}</span>
      );
  }
}

export default Badge;
