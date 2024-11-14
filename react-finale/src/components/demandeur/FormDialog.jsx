import { Box, Chip, Dialog, DialogTitle, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField, useTheme } from '@mui/material';
import React, { useContext, useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import AuthContext from '../../authRouter/AuthContext';
import { toast } from 'react-toastify';

const FormDialog = ({ open, handleClose, categories }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [categorie, setCategorie] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [proprietaire, setProprietaire] = useState("");
  const [code, setCode] = useState("");
  const [date, setDate] = useState(null);
  const theme = useTheme();
  const { user, token } = useContext(AuthContext)

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedSubCategories(value);
  };

  const handleCategorieChange = (event) => {
    const selectedCategoryId = event.target.value;
    setCategorie(selectedCategoryId);
    const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);
    setSubCategories(selectedCategory ? selectedCategory.subCategories : []);
    setSelectedSubCategories([]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const demande = {
      demande: {
        code: code,
        date: date ? dayjs(date).format('YYYY-MM-DD') : null,
        proprietaire: proprietaire,
        demandeur: { id: user.id },
        description: description,
      },
      subCategories: selectedSubCategories
    };

    if (!code || !proprietaire || !description) {
      toast.error("Tous les champs obligatoires doivent être remplis.");
      return;
    }

    try {
      const res = await fetch("/api/demande/create", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(demande)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Une erreur est survenue lors de la création de la demande.');
      }

      const data = await res.json();
      toast.success("Demande bien crée");
    } catch (error) {
      toast.error(error.message || 'Une erreur est survenue.');
    }finally{
      setCategorie("")
      setCode("")
      setProprietaire("")
      setSelectedSubCategories([])
      setDate(null)
      setDescription("")
      handleClose(false)
    }
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ color: theme.palette.primary.dark }}>Ajouter une demande</DialogTitle>
        <form className='px-5 py-3' onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Proprietaire"
                variant="outlined"
                fullWidth
                value={proprietaire}
                onChange={(event) => { setProprietaire(event.target.value) }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Code"
                variant="outlined"
                fullWidth
                value={code}
                onChange={(event) => { setCode(event.target.value) }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-description"
                label="Description"
                variant="outlined"
                multiline
                maxRows={1}
                fullWidth
                value={description}
                onChange={handleDescriptionChange}
              />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl fullWidth>
                  <DatePicker
                    label="Sélectionner une date"
                    value={date}
                    onChange={handleDateChange}
                  />
                </FormControl>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="categorie-label">Categorie</InputLabel>
                <Select
                  labelId="categorie-label"
                  id="categorie"
                  label="Categorie"
                  value={categorie}
                  onChange={handleCategorieChange}
                >
                  {categories.map((categorie) => (
                    <MenuItem key={categorie.id} value={categorie.id}>{categorie.nom}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth disabled={subCategories?.length === 0}>
                <InputLabel id="demo-multiple-chip-label">Sous-Categories</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={selectedSubCategories}
                  onChange={handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Sous-Categorie" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((subCat) => (
                        <Chip key={subCat.id} label={subCat.nom} />
                      ))}
                    </Box>
                  )}
                >
                  {subCategories.map((subCat) => (
                    <MenuItem key={subCat.id} value={subCat}>
                      {subCat.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <div className='flex justify-end my-3'>
            <button className='bg-indigo-700 px-7 py-2 rounded-full hover:bg-indigo-800 text-white' type="submit">Ajouter</button>
          </div>
        </form>
      </Dialog>
    </Box>
  );
};

export default FormDialog;