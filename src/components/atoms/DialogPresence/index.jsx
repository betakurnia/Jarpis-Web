import React from "react";

import ButtonInfo from "../../atoms/ButtonInfo";
import ButtonRed from "../../atoms/ButtonRed";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import makeStyles from "@material-ui/styles/makeStyles";

function DialogPresence({
  present,
  open,
  handleClose,
  handleChange,
  handleSubmit,
}) {
  const useStyles = makeStyles({
    root: {
      minWidth: 480,
    },
    title: {
      fontWeight: 500,
    },
  });

  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="title"
      aria-describedby="description"
    >
      <DialogContent className={classes.root}>
        <DialogTitle id="title">
          <Typography variant="h5" component="h2" className={classes.title}>
            Kehadiran
          </Typography>
        </DialogTitle>
        <DialogContentText id="description">
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={present.status}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Hadir"
                control={<Radio />}
                label="Hadir"
              />
              <FormControlLabel
                value="Sakit"
                control={<Radio />}
                label="Sakit"
              />
              <FormControlLabel value="Izin" control={<Radio />} label="Izin" />
            </RadioGroup>
          </FormControl>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonRed onClick={handleClose}>Batal</ButtonRed>
        <ButtonInfo handleClick={handleSubmit}>Ok</ButtonInfo>
      </DialogActions>
    </Dialog>
  );
}

export default DialogPresence;
