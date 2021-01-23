import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

function Dialogs({ open, title, children, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose} aria-describedby="description">
      <DialogContent>
        <DialogContentText id="description">{title}</DialogContentText>
      </DialogContent>
      <DialogActions>{children}</DialogActions>
    </Dialog>
  );
}

export default Dialogs;
