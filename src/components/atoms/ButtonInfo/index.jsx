import React from "react";

import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/styles/makeStyles";

import color from "../../../utils/color";

function ButtonInfo({ children, handleDelete }) {
  const useStyles = makeStyles({
    btnDanger: {
      backgroundColor: color.info,
      color: color.white,
      "&:hover": {
        backgroundColor: color.info,
      },
    },
  });

  const classes = useStyles();

  return (
    <Button onClick={handleDelete} autoFocus className={classes.btnDanger}>
      {children}
    </Button>
  );
}

export default ButtonInfo;