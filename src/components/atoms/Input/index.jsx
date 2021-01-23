import React from "react";

import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/styles/makeStyles";

import color from "../../../utils/color";

function Input({
  id,
  label,
  placeholder,
  name,
  handleChange,
  type = "text",
  value,
  idx,
}) {
  const useStyles = makeStyles({
    root: {
      marginTop: "1.5rem",
    },
    label: {
      color: color.label,
      fontSize: "1rem",
    },
    form: {
      marginTop: "0.5rem",
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <label htmlFor={id + idx} className={classes.label}>
        {label}
      </label>
      <TextField
        id={id + idx}
        placeholder={placeholder}
        name={name}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.form}
        variant="outlined"
        type={type}
        value={value}
        onChange={(e) => {
          handleChange(e, id, idx);
        }}
      />
    </div>
  );
}

export default Input;
