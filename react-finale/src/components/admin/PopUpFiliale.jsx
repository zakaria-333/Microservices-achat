import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, DialogTitle, useTheme } from "@mui/material";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AuthContext from '../../authRouter/AuthContext';

export default function PopUp({ action, data, onSuccess }) {
  const [open, setOpen] = React.useState(false);
  const { token } = React.useContext(AuthContext);
  const [code, setCode] = React.useState(data.code || '');
  const [nom, setNom] = React.useState(data.nom || '');
  const [id, setId] = React.useState(data.id);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = action === 'Update' ? `/api/demande/filiale/update` : '/api/demande/filiale/create';
    const method = action === 'Update' ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include this if needed
        },
        body: JSON.stringify({ id, nom, code })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (onSuccess) {
        onSuccess();
      }

      console.log('Data submitted successfully');
      handleClose();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <React.Fragment>
      {action === 'Update' && (
        <Button
          onClick={handleClickOpen}
          sx={{ fontSize: 12, backgroundColor: theme.palette.success.light, color: theme.palette.text.primary }}
          startIcon={<BorderColorOutlinedIcon />}
        >
          Modifier
        </Button>
      )}

      {action === 'Add Subsidiary' && (
        <Button
          onClick={handleClickOpen}
          sx={{
            width: '230px',
            margin: 1,
            fontSize: '16px',
            fontFamily: 'initial',
            bgcolor: theme.palette.mode === 'dark' ? 'white' : 'black',
            color: theme.palette.mode === 'dark' ? 'black' : 'white',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark' ? 'yellow' : 'darkblue',
              color: theme.palette.mode === 'dark' ? 'black' : 'white'
            }
          }}
          startIcon={<AddCircleOutlineOutlinedIcon />}
        >
          Ajouter une filiale
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontSize: '22px' }}>{action}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '29ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="outlined-required"
                label="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button type="submit">Confirmer</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}