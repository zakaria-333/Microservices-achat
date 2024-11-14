import * as React from 'react';
import Button from '@mui/material/Button';
import { Avatar, Box, DialogTitle, useTheme } from "@mui/material";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MenuItem from '@mui/material/MenuItem';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AuthContext from '../../authRouter/AuthContext';
import axios from 'axios';

export default function PopUp({ action, data,onSuccess }) {
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const { token } = React.useContext(AuthContext);
  const [code, setCode] = React.useState(data.code || '');
  const [nom, setNom] = React.useState(data.nom || '');
  const [id, setId] = React.useState(data.id);
  const [category, setCategory] = React.useState(data.categorieid || '');





  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();

  const fetchDataFou = async () => {
    try {
      const response = await axios.get('/api/budget/categorie/all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const transformedData = response.data.map((item) => ({
        id: item.id,
        label: item.nom,
      }));

      setCategories(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchDataFou();
  }, []);



  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = action === 'Update' ? `/api/demande/fournisseur/update` : '/api/demande/fournisseur/create';
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
          categorie: { id: category } 
          // Ensure `filiale` is sent as an object with `id`
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




// popUp affiche pour soit ajouter ou modifier un filiale 



  return (
    <React.Fragment>

      {action == 'Update' && <Button onClick={handleClickOpen}  sx={{fontSize:12,backgroundColor:theme.palette.success.light
          ,color:theme.palette.text.primary
          
        }} startIcon={<BorderColorOutlinedIcon />}>
          Modifier
        </Button>}

      {action == 'Add Supplier' && <Button onClick={handleClickOpen} sx={{width:'300px',margin:1,fontSize:'16px',fontFamily:'initial',bgcolor:theme.palette.mode=='dark'?'white':'black',color:theme.palette.mode=='dark'?'black':'white','&:hover': {
      bgcolor: theme.palette.mode === 'dark' ?  'yellow':'darkblue',
      color: theme.palette.mode === 'dark' ? 'black' : 'white'   
    }}} startIcon={<AddCircleOutlineOutlinedIcon />}>
          Ajouter un fournisseur
        </Button>}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit:handleSubmit
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
             
              <TextField
                id="outlined-select-currency"
                select
                label="Categorie"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                
              >
                {categories.map((option) => (
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
