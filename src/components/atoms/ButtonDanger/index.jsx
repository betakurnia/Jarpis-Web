import React from "react";

import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/styles/makeStyles";

import color from "../../../utils/color";

function ButtonDanger({ children, handleClick, ...rest }) {
  const useStyles = makeStyles({
    btnDanger: {
      backgroundColor: color.danger,
      color: color.white,
      "&:hover": {
        backgroundColor: color.danger,
      },
    },
  });

  const classes = useStyles();

  return (
    <Button onClick={handleClick} autoFocus className={classes.btnDanger}>
      {children}
    </Button>
  );
}

export default ButtonDanger;
