import React from "react";

import makeStyles from "@material-ui/styles/makeStyles";
import clsx from "clsx";

import color from "../../../utils/color";

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
  bgPrimary: {
    backgroundColor: color.primary,
  },
});

export function BadgeStatus({ status }) {
  const classes = useStyles();

  switch (status) {
    case "Hadir":
      return <span className={clsx(classes.bgInfo, classes.badge)}>Hadir</span>;
    case "Izin":
      return (
        <span className={clsx(classes.bgWarning, classes.badge)}>Izin</span>
      );
    case "Sakit":
      return (
        <span className={clsx(classes.bgWarning, classes.badge)}>Sakit</span>
      );
    default:
      return (
        <span className={clsx(classes.bgPrimary, classes.badge)}>{status}</span>
      );
  }
}

export function BadgeResult({ result }) {
  const classes = useStyles();

  if (result > 70) {
    return (
      <span className={clsx(classes.bgInfo, classes.badge)}>{result}</span>
    );
  }
  return (
    <span className={clsx(classes.bgDanger, classes.badge)}>{result}</span>
  );
}

export function BadgeExam({ presence }) {
  const classes = useStyles();

  if (presence > 7) {
    return <span className={clsx(classes.bgInfo, classes.badge)}>Ya</span>;
  }
  return <span className={clsx(classes.bgDanger, classes.badge)}>Tidak</span>;
}
