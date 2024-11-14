import React, { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'; // Import TextField for search input
import Carde from '../../components/directeurSite/Carde';
import AuthContext from '../../authRouter/AuthContext';
import axios from 'axios';
import SnackNar from '../../components/SnackNar';

export default function DemandeSite() {
  const { user, token, fetchDemandesCd } = useContext(AuthContext);
  const [demandes, setDemandes] = useState([]);
  const [filteredDemandes, setFilteredDemandes] = useState([]); // State for filtered demandes
  const [search, setSearch] = useState(''); // State for search input
  const [open, setOpen] = useState(false);

  const fetchDemandes = async () => {
    if (user.site.id) {
      try {
        const response = await axios.get(`/api/demande/demandeBySite/${user.site.id}`, {
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
        demande.confirmationCd.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, demandes]);

  const handleValiderDemande = async (demande) => {
    try {
      const response = await axios.post('/api/demande/validerDemande', demande, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.data) {
        setOpen(true);
        fetchDemandesCd();
      }
    } catch (error) {
      console.error('Error validating demande:', error);
      alert('Failed to validate demande.');
    }
  };

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
              etat={demande.confirmationCd}
              name={demande.demandeur.nom}
              date={new Date(demande.date).toLocaleDateString()}
              prop={demande.proprietaire}
              desc={demande.description}
              cat={demande.details[0].subCategorie.categorie.nom}
              onValidate={() => handleValiderDemande(demande)}
              demande={demande}
              fetch={fetchDemandes} // Pass the demande object to Carde
            />
          </Grid>
        ))}
      </Grid>
      <SnackNar open={open} setOpen={setOpen} text={'Demande est valide avec succès'} color={'success'} />
    </Box>
  );
}
