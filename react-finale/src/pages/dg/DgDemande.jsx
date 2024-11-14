import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../authRouter/AuthContext';
import { Backdrop, Box, Button, Card, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Tooltip, Typography, useTheme } from '@mui/material';
import { RingLoader } from 'react-spinners';
import IconButton from '@mui/material/IconButton';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import { toast } from 'react-toastify';


const DgDemande = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token, user } = useContext(AuthContext);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [demande, setDemande] = useState({})

  const handleClose = () => {
    setOpen(false);
  };

  const fetchDemandes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/demande/dg/filtered', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setDemandes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setDemandes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, [token]);

  const handleOkClick = async (demande) => {
    const hasExceededBudget = demande.details.some(detail => detail.montant > detail.subCategorie.budget);

    if (hasExceededBudget) {
      toast.error("Un ou plusieurs montants dépassent le budget de leur sous-catégorie");
    } else {
      try {
        const confirmation = {
          user,
          demande
        }

        const res = await fetch("/api/demande/confirm", {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(confirmation)
        })

        if (res.ok) {
          toast.success("Validation terminée avec succès")
          setDemandes([]);
          fetchDemandes();
        }
      } catch (error) {

      }
    }
  };

  const handleNoClick = (demande) => {
    setDemande(demande);
    setOpen(true);
  };


  const handle = async () => {
    if (description.trim() === "") { // Utilisation de .trim() pour éviter les espaces vides
      toast.warning("Veuillez remplir le champ de justification");
      return;
    }

    const justification = {
      user,
      demande,
      description
    };

    setLoading(true);
    try {
      const res = await fetch('/api/demande/addJustification', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(justification)
      });

      if (res.ok) {
        toast.success("Justification envoyée");
      } else {
        toast.error("Une erreur s'est produite lors de l'envoi de la justification");
      }

    } catch (error) {
      toast.error("Erreur: " + error.message);
    } finally {
      setDemandes([]);
      fetchDemandes();
      setDescription("");
      handleClose()
    }
  };


  return (
    <Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={2}>
        {demandes.length > 0 ? (
          demandes.map((demande) => (
            <Grid item xs={4} key={demande.id}>
              <Card elevation={4}>
                <Box p={2}>
                  <div className='flex justify-between mb-2'>
                    <h1>{demande.code}</h1>
                    <h1 className='text-blue-400'>{demande.date}</h1>
                  </div>
                  <div className='flex justify-between mb-2'>
                    <h1>{demande.proprietaire}</h1>
                    <h1 className='text-blue-400'>{demande.demandeur.site.nom}</h1>
                  </div>
                  <div className='mb-2 flex gap-1'>
                    <h1>Description:</h1>
                    <h1 className='text-blue-300 text-right'>{demande.description}</h1>
                  </div>
                  <div className='flex justify-between mb-2'>
                    <h1>Montant</h1>
                    <h1 className='text-blue-400'>{demande.montant} DH</h1>
                  </div>

                  <div className='flex justify-between mb-2'>
                    <h1>Fournisseur</h1>
                    <h1 className='text-blue-400'>{demande.fournisseur?.nom}</h1>
                  </div>

                  <div className='mb-2'>
                    <h2 className='font-bold text-violet-500 text-center'>Détails</h2>
                    {demande.details.map((detail, index) => (
                      <div key={index} className='flex justify-between mb-2'>
                        <span className='text-violet-300'>{detail.subCategorie.nom}</span>
                        <Tooltip
                          title={detail.montant > detail.subCategorie.budget ? `dépasse le budget de ${detail.subCategorie.budget} DH` : ''}
                          placement="top"
                        >
                          <span style={{ color: detail.montant > detail.subCategorie.budget ? 'red' : 'inherit', cursor: 'pointer' }}>
                            {detail.montant} DH
                          </span>
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                  <div className='flex justify-end'>
                    <Tooltip title="Refuser">
                      <IconButton
                        sx={{ color: theme.palette.error.main }}
                        onClick={() => handleNoClick(demande)}>
                        <ThumbDownOffAltOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Valider">
                      <IconButton sx={{ color: theme.palette.success.main }} onClick={() => handleOkClick(demande)}>
                        <ThumbUpOffAltOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <div className="flex justify-center items-center">
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="80vh">
                <RingLoader
                  color={"#bfdbfe"}
                  loading={true}
                  size={150}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  Pas de demandes à l'instant
                </Typography>
              </Box>
            </div>
          </Grid>
        )}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          Ajouter une justification pour le refus de la demande
        </DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          <TextField
            id="outlined-multiline-flexible"
            label="Justification"
            multiline
            maxRows={4}
            fullWidth
            focused
            value={description}
            onChange={(event) => { setDescription(event.target.value) }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handle}>Envoyer</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default DgDemande;


