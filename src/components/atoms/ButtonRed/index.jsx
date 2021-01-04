import React from "react";

import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/styles/makeStyles";

import color from "../../../utils/color";

function ButtonRed({ children, handleClick, ...rest }) {
  const useStyles = makeStyles({
    btnRed: {
      color: color.danger,
    },
  });

  const classes = useStyles();

  return (
    <Button onClick={handleClick} autoFocus className={classes.btnRed}>
      {children}
    </Button>
  );
}

export default ButtonRed;
