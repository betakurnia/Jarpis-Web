import React from "react";

import Alert from "@material-ui/lab/Alert";
import makeStyles from "@material-ui/styles/makeStyles";

import color from "../../../utils/color";

function ErrorSucess({ isSucess, isError, sucessMessage, errorMessages }) {
  const useStyles = makeStyles({
    btn: {
      marginTop: "2rem",
    },
    alert: {
      marginTop: "1.5rem",
    },
    formControl: {
      marginTop: "1.5rem",
    },
    label: {
      color: color.label,
    },
  });

  const classes = useStyles();

  return (
    <div>
      {isSucess && <Alert className={classes.alert}>{sucessMessage}</Alert>}
      {isError && (
        <Alert className={classes.alert} severity="error">
          {errorMessages.filter((errorMessage) => errorMessage)[0]}
        </Alert>
      )}
    </div>
  );
}

export default ErrorSucess;
