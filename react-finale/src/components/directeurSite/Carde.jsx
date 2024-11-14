import React, { useState, useContext } from 'react';
import Card from '@mui/material/Card';
import { Box, Button, CardActions, CardContent, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Stack, TextField, Typography, useTheme } from '@mui/material';

import AlertValider from './AlertValider';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import AuthContext from '../../authRouter/AuthContext';
import axios from 'axios';
import SnackNar from '../../components/SnackNar';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import Person3OutlinedIcon from '@mui/icons-material/Person3Outlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';

const Carde = ({ code, name, date, desc, prop, etat, sub, cat, onValidate, demande,fetch }) => {
  const theme = useTheme();
  const { user, token,demandesCount,fetchDemandesCd } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [opene, setOpene] = useState(false);
  
  const [justification, setJustification] = useState('');

  const handleClickOpen = () => {
    setOpene(true);
  };

  const handleClose = () => {
    setOpene(false);
  };

  const handleSubscribe = async () => {
    const justificetionWrapper = {
      demande: demande,
      user: user,
      description: justification,
    };

    try {
      const response = await axios.post('/api/demande/justification/cancel', justificetionWrapper, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.data) {
        setOpen(true);
        handleClose();
        fetch();
        fetchDemandesCd();

      }
    } catch (error) {
      console.error('Error submitting justification:', error);
      alert('Failed to submit justification.');
    }
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: '8px',backgroundColor:etat=='validé'?'#efffec':etat=='refusé'?'#fff4f3':'#ecffff'
     }}>
      <React.Fragment>
        <CardContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '29ch' },
            }}
            noValidate  
            autoComplete="off"
          >
            <Chip label={code} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'cursive', fontSize: '16px',color:'black'  }} />
            <Stack direction={'row'} sx={{ justifyContent: 'space-between',mt:'8px',color:'black'  }}>
            <Typography sx={{fontWeight: 'bold'}} ><Person3OutlinedIcon sx={{mr:'8px',fontWeight: 'bold'  }} />Demandeur</Typography>
            <Typography >{name}</Typography>
            </Stack>
            <Stack direction={'row'} sx={{ justifyContent: 'space-between',mt:'8px',color:'black'  }}>
            <Typography sx={{fontWeight: 'bold' }} ><CalendarMonthOutlinedIcon sx={{mr:'8px',fontWeight: 'bold' }} />Date</Typography>
            <Typography>{date}</Typography>
            </Stack>
      
            <Stack direction={'row'} sx={{ justifyContent: 'space-between',mt:'8px',color:'black'  }}>
            <Typography sx={{fontWeight: 'bold' }} ><CategoryOutlinedIcon sx={{mr:'8px',fontWeight: 'bold' }} />Categorie</Typography>
            <Typography>{cat}</Typography>
            </Stack>
            <Stack direction={'row'} sx={{ justifyContent: 'space-between',mt:'8px',color:'black'  }}>
            <Typography sx={{fontWeight: 'bold' }} ><PersonSearchOutlinedIcon sx={{mr:'8px',fontWeight: 'bold' }} />Propritaire</Typography>
            <Typography>{prop}</Typography>
            </Stack>
           
            <Box sx={{ display: 'flex', flexWrap: 'wrap',justifyContent:'center', gap: 1, mt: 2,mb: 2  }}>
              {sub && sub.map((item, index) => (
                <Chip key={index} label={item.subCategorie.nom} sx={{ fontFamily: 'cursive', fontSize: '16px',color:'black'  }} />
              ))}
            </Box>
            <div className="text-center mt-2 mb-0 text-gray-950">
              <h3 className="underline font-bold font-serif">Description</h3>
              <p className="border-2 w-full h-20 overflow-auto p-2 ">
                {desc}
              </p>
            </div>
          </Box>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <AlertValider
            text1={'Etes-vous sûr de vouloir valider cette demande ?'}
            text2={"Après validation, le statut d'une Demande ne peut plus être modifié, et elle doit être automatiquement transférée au service achats."}
            onSuccess={onValidate}
            etat={etat}
          />
          <Chip label={etat} sx={{backgroundColor:etat=='refusé'?'red':etat=='validé'?'green':'blue', fontFamily: 'cursive', fontSize: '16px',color:'black'  }} />
          {etat !== 'validé' && etat !== 'refusé' && <Fab onClick={handleClickOpen} color="error" aria-label="edit" size="small">
          <ClearOutlinedIcon />
          </Fab>}
        </CardActions>
        <Dialog
          open={opene}
          onClose={handleClose}
          fullWidth
        >
          <DialogTitle>ajouter la justification pour le refus </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="justification"
              multiline
              maxRows={4}
              label="Enter Justification"
              fullWidth
              variant="standard"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
            />
          </DialogContent>
          <DialogActions >
            <Button onClick={handleClose}>Annuler</Button>
            <Button onClick={handleSubscribe}>Confirmer</Button>
          </DialogActions>
        </Dialog>
        <SnackNar open={open} setOpen={setOpen} text={'demande est refusé avec succés'} color={'success'} />
      </React.Fragment>
    </Card>
  );
};

export default Carde;
