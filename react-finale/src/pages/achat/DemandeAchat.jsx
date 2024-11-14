import React, { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'; // Import TextField for search input

import AuthContext from '../../authRouter/AuthContext';
import axios from 'axios';
import SnackNar from '../../components/SnackNar';
import Carde from '../../components/achat/Carde';

export default function DemandeAchat() {
  const { user, token, fetchDemandesCd } = useContext(AuthContext);
  const [demandes, setDemandes] = useState([]);
  const [filteredDemandes, setFilteredDemandes] = useState([]); // State for filtered demandes
  const [search, setSearch] = useState(''); // State for search input
  const [open, setOpen] = useState(false);

  const fetchDemandes = async () => {
    
      try {
        const response = await axios.get('/api/demande/demandeComfirmeCd', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setDemandes(response.data);
        setFilteredDemandes(response.data); // Initialize filteredDemandes
      } catch (error) {
        console.error('Error fetching demandes:', error);
      }
    
  };

  useEffect(() => {
    fetchDemandes();
  }, [open]);

  useEffect(() => {
    // Filter demandes based on search input
    setFilteredDemandes(
      demandes.filter(demande =>
        demande.code.toLowerCase().includes(search.toLowerCase()) ||
        demande.proprietaire.toLowerCase().includes(search.toLowerCase()) ||
        demande.demandeur.nom.toLowerCase().includes(search.toLowerCase()) ||
        demande.confirmationAchat.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, demandes]);

 
  return (
    <Box sx={{ minWidth: 275 }}>
      <TextField
        label="Recherche par code ou Propriétaire ou Demandeur ou Etat"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }} // Add margin-bottom
      />
      <Grid container spacing={2}>
        {filteredDemandes.map(demande => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={demande.id}>
            <Carde
              code={demande.code}
              sub={demande.details}
              etat={demande.confirmationAchat}
              name={demande.demandeur.nom}
              date={new Date(demande.date).toLocaleDateString()}
              prop={demande.proprietaire}
              desc={demande.description}
              cat={demande.details[0].subCategorie.categorie.nom}
              catId={demande.details[0].subCategorie.categorie.id}
              demande={demande}
              fetch={fetchDemandes} // Pass the demande object to Carde
            />
          </Grid>
        ))}
      </Grid>
      <SnackNar open={open} setOpen={setOpen} text={'Demande est validée avec succès'} color={'success'} />
    </Box>
  );
}
