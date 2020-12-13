import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import color from "../../../utils/color";

function Input({
  id,
  label,
  placeholder,
  handleChange,
  isPassword,
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
      <label htmlFor={id} className={classes.label}>
        {label}
      </label>
      <TextField
        id={id}
        placeholder={placeholder}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.form}
        variant="outlined"
        type={isPassword && "password"}
        value={value}
        onChange={(e) => {
          handleChange(e, id, idx);
        }}
      />
    </div>
  );
}

export default Input;
