import React from "react";

import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/styles/makeStyles";

import color from "../../../utils/color";

function ButtonInfo({ children, handleClick, ...rest }) {
  const useStyles = makeStyles({
    btnInfo: {
      backgroundColor: color.info,
      color: color.white,
      "&:hover": {
        backgroundColor: color.info,
      },
    },
  });

  const classes = useStyles();

  return (
    <Button
      onClick={handleClick}
      autoFocus
      className={classes.btnInfo}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default ButtonInfo;
