import React from "react";

import makeStyles from "@material-ui/styles/makeStyles";

function TheoryIcon() {
  const useStyles = makeStyles({
    img: {
      width: 100,
      height: 120,
    },
  });

  const classes = useStyles();

  return <img src="/helper/theorys.jpg" alt="theory" className={classes.img} />;
}

export default TheoryIcon;
