import React from "react";
import { makeStyles } from "@material-ui/styles";

function Badge({ status }) {
  const useStyles = makeStyles({
    green: {
      backgroundColor: "green",
      padding: "0.5rem 1rem",
      color: "#ffffff",
      borderRadius: "0.5rem",
    },
    red: {
      backgroundColor: "#dc3545",
      padding: "0.5rem 1rem",
      color: "#ffffff",
      borderRadius: "0.5rem",
    },
    yellow: {
      backgroundColor: "#ffc107",
      padding: "0.5rem 1rem",
      color: "#ffffff",
      borderRadius: "0.5rem",
    },
  });

  const classes = useStyles();

  switch (status) {
    case "Hadir":
      return <span className={classes.green}>Hadir</span>;
    case "Tidak Hadir":
      return <span className={classes.red}>Tidak Hadir</span>;
    case "Sakit":
      return <span className={classes.yellow}>Sakit</span>;
    default:
      return <span className={classes.yellow}>{status}</span>;
  }
}

export default Badge;
