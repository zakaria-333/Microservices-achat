import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from "@mui/material";
import DeleteIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AuthContext from '../../authRouter/AuthContext';
import axios from 'axios';

const AlertDeleteSite = ({ text1, text2, id, onSuccess }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();

  const { token } = React.useContext(AuthContext);
  const handleDelete = async () => {
    try {
      console.log(id)
      const response = await axios.delete(`/api/demande/site/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        if (onSuccess) {
          onSuccess();
        }
     
        console.log('Data deleted successfully');
        handleClose();
      } else {
        
        throw new Error('Failed to delete data');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <React.Fragment>


      <Button onClick={handleClickOpen} sx={{
        fontSize: 12, backgroundColor: theme.palette.error.light, color: theme.palette.text.primary

      }} startIcon={<DeleteOutlineOutlinedIcon />}>
        Supprimer
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogTitle id="alert-dialog-title">
        {/* "Are you sure you want to delete this user? */}
          {text1}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {/* After clicking on 'Agree,' this user will be permanently deleted and cannot be recovered. */}
          {text2}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleDelete} autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default AlertDeleteSite
