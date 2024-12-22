import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const PikaDialog = ({ open, handleClose, children }) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">Pokemon Details</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>{children}</DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

PikaDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.node.isRequired
};

export default PikaDialog;
