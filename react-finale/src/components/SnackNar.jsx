import { Alert, Snackbar } from '@mui/material'
import React from 'react';





const SnackNar = ({open,setOpen,text,color}) => {

 
const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar
    open={open}
    autoHideDuration={3000}
    onClose={handleClose}

  >
    <Alert
      severity={color}
      variant="filled"
      sx={{ width: '100%' }}
    >
      {text}
    </Alert>
  </Snackbar>
  )
}

export default SnackNar
