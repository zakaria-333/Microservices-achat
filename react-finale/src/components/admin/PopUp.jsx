import * as React from 'react';
import Button from '@mui/material/Button';
import { Avatar, Box, useTheme } from "@mui/material";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MenuItem from '@mui/material/MenuItem';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Picture from './Picture';
import AuthContext from '../../authRouter/AuthContext';
import axios from 'axios';



// ajouter ou modifier un user soous forme d une poopup
export default function PopUp({ action, data ,onSuccess}) {
  const [open, setOpen] = React.useState(false);
 
  const [currencies, setCurrencies] = React.useState([]);
  const [currencies1, setCurrencies1] = React.useState([]);
  const { token } = React.useContext(AuthContext);
  const [nom, setNom] = React.useState(data.nom || '');
  const [prenom, setPrenom] = React.useState(data.prenom || '');
  const [email, setEmail] = React.useState(data.email);
  const [username, setUsername] = React.useState(data.username || '');
  const [id, setId] = React.useState(data.id || '');
  const [mdp, setMdp] = React.useState(data.mdp);
  const [role, setRole] = React.useState(data.roleId || '');
  const [site, setSite] = React.useState(data.siteId || '');
  const [siteName, setSiteName] = React.useState(data.site || '');
  const [photo, setPhoto] = React.useState(data.picture || '');

  



  const fetchDataRole = async () => {
    try {
      const response = await axios.get('/api/user/role/all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const transformedData = response.data.map((item) => ({
        id: item.id,
        label: item.title,
      }));

      setCurrencies(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchDataRole();
  }, []);


  const fetchDataSite = async () => {
    const endpoint = role === 3 ? '/api/demande/site/noDs' : '/api/demande/site/all';

    try {
        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        let transformedData = response.data.map((item) => ({
            id: item.id,
            label: item.nom,
        }));

        // Vérifiez si le site actuel est déjà dans la liste des sites disponibles
        if (action === 'Update' && site && !transformedData.some((item) => item.id === site)) {
            // Ajouter le site actuel si ce n'est pas le cas
            const currentSite = {
                id: site, // Utilisez l'ID du site actuel
                label: siteName, // Utilisez le nom du site si vous l'avez, sinon un placeholder
            };

            transformedData = [currentSite, ...transformedData];
        }

        setCurrencies1(transformedData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


  React.useEffect(() => {
    if (role === 3 || role === 6) {
      fetchDataSite();
    }
  }, [role]);
  



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };
  const theme = useTheme();
  
  
  // data poour le select de site
 




  const handleSubmit = async (event) => {
    event.preventDefault();

    let url = '';
    let method = 'POST';

    if (action === 'Update') {
        method = 'PUT';
        if (role === 3) { // DS role
            url = '/api/user/ds/update';
            
        } else if (role === 6) { // Demandeur role
            url = '/api/user/demandeur/update';
        } else {
            url = '/api/user/update';
        }
    } else { // Add User
        if (role === 3) { // DS role
            url = '/api/user/ds/create';
            
        } else if (role === 6) { // Demandeur role
            url = '/api/user/demandeur/create';
        } else {
            url = '/api/user/create';
        }
    }

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
          prenom,
          email,
          username,
          mdp,
          photo: photo.split(',')[1], 
          role: { id: role },
          site: { id: site }, // Ensure `filiale` is sent as an object with `id`
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

      {action == 'Update' && <Button onClick={handleClickOpen} sx={{
        fontSize: 12, backgroundColor: theme.palette.success.light
        , color: theme.palette.text.primary

      }} startIcon={<BorderColorOutlinedIcon />}>
        Modifier
      </Button>}

      {action == 'Add User' && <Button onClick={handleClickOpen} sx={{
        width: '150px', margin: 1, fontSize: '16px', fontFamily: 'initial', bgcolor: theme.palette.mode == 'dark' ? 'white' : 'black', color: theme.palette.mode == 'dark' ? 'black' : 'white', '&:hover': {
          bgcolor: theme.palette.mode === 'dark' ? 'yellow' : 'darkblue',
          color: theme.palette.mode === 'dark' ? 'black' : 'white'
        }
      }} startIcon={<PersonAddAltIcon />}>
        {action}
      </Button>}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit
        }}
      >
        {/* <DialogTitle sx={{ textAlign: 'center', fontSize: '22px' }}>Add User</DialogTitle> */}
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
            <div className='flex flex-col'>
                <Avatar sx={{ mx: "auto", width: 80, height: 60, border: "1px solid grey", my: 1 }} alt="Profile" src={photo} />
                <Picture setPhoto={setPhoto} />
              </div>


              <TextField

                required
                id="outlined-required"
                label="Prénom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}

              />
              <TextField
                required
                id="outlined-required"
                label="Nom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}

              />
              <TextField
                required
                id="outlined-required"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}

              />
              <TextField
                required
                id="outlined-required"
                label="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}


              />
              {action=='Add User' &&<TextField
                required
                id="outlined-required"
                label="Mot de passe"
                type='password'
                value={mdp}
                onChange={(e) => setMdp(e.target.value)}

              />}
              <TextField
                id="outlined-select-currency"
                select
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={action === 'Update'}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {( role == 6 || role == 3) && <TextField
               
                select
                id="outlined-select-currency"
                label="Site"
                value={site}
                onChange={(e) => setSite(e.target.value)}>
                {currencies1.map((option) => (
                  
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>}





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
