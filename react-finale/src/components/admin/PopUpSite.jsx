import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, DialogTitle, useTheme } from "@mui/material";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MenuItem from '@mui/material/MenuItem';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DomainAddOutlinedIcon from '@mui/icons-material/DomainAddOutlined';
import axios from 'axios';
import AuthContext from '../../authRouter/AuthContext';

// PopUp for adding or updating a site
export default function PopUp({ action, data, onSuccess }) {
  const [open, setOpen] = React.useState(false);
  const [currencies1, setCurrencies1] = React.useState([]);
  const { token } = React.useContext(AuthContext);
  const [code, setCode] = React.useState(data.code || '');
  const [nom, setNom] = React.useState(data.nom || '');
  const [id, setId] = React.useState(data.id);
  const [ville, setVille] = React.useState(data.ville || '');
  const [filiale, setFiliale] = React.useState(data.idFiliale || '');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();

  // Fetch data for the select
  const fetchDataFiliale = async () => {
    try {
      const response = await axios.get('/api/demande/filiale/all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const transformedData = response.data.map((item) => ({
        id: item.id,
        label: item.nom,
      }));

      setCurrencies1(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchDataFiliale();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = action === 'Update' ? `/api/demande/site/update` : '/api/demande/site/create';
    const method = action === 'Update' ? 'PUT' : 'POST';

    try {
      const response = await axios({
        method: method,
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: {
          id,
          nom,
          code,
          ville,
          filiale: { id: filiale } // Ensure `filiale` is sent as an object with `id`
        }
      });

      if (response.status === 200) {
        if (onSuccess) {
          onSuccess();
        }
        console.log('Data submitted successfully');
        handleClose();
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <React.Fragment>
      {action === 'Update' && <Button onClick={handleClickOpen} sx={{
        fontSize: 12, backgroundColor: theme.palette.success.light, color: theme.palette.text.primary
      }} startIcon={<BorderColorOutlinedIcon />}>
        modifier
      </Button>}

      {action === 'Add Site' && <Button onClick={handleClickOpen} sx={{
        width: '200px', margin: 1, fontSize: '16px', fontFamily: 'initial', bgcolor: theme.palette.mode === 'dark' ? 'white' : 'black', color: theme.palette.mode === 'dark' ? 'black' : 'white', '&:hover': {
          bgcolor: theme.palette.mode === 'dark' ? 'yellow' : 'darkblue',
          color: theme.palette.mode === 'dark' ? 'black' : 'white'
        }
      }} startIcon={<DomainAddOutlinedIcon />}>
        Ajouter un site
      </Button>}

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
            sx={{ '& .MuiTextField-root': { m: 1, width: '29ch' } }}
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
              <TextField
                required
                id="outlined-required"
                label="Ville"
                value={ville}
                onChange={(e) => setVille(e.target.value)}
              />
              <TextField
                id="outlined-select-currency"
                select
                label="Filiale"
                value={filiale}
                onChange={(e) => setFiliale(e.target.value)}
              >
                {currencies1.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
