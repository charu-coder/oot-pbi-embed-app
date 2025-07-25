import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

const ErrorModal = ({ errorMessage, onClose }) => {
  return (
    <Dialog  open={!!errorMessage}
    onClose={onClose}
    // Customizing width using sx prop
    sx={{ '& .MuiDialog-paper': { width: '100%' } }}>
      <DialogTitle>{"Error"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{"An unknown error has occured while processing your request. Kindly try again or refresh the browser."}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal
