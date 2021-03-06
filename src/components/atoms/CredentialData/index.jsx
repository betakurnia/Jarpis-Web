import React from "react";

import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";

import color from "../../../utils/color";

function CredentialData({ role, email, password }) {
  const useStyles = makeStyles({
    role: {
      color: color.lightBlack,
    },
    root: {
      margin: 0,
      listStyle: "none",
    },
  });

  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6" component="p" className={classes.role}>
        {role}
      </Typography>
      <ul className={classes.root}>
        <li>Email : {email}</li>
        <li>Password : {password}</li>
      </ul>
    </div>
  );
}

export default CredentialData;
