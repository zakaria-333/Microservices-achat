import { Backdrop, Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, TextField, useTheme } from '@mui/material';
import AuthContext from '../../authRouter/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const BudgetAdjustment = () => {
  const theme = useTheme();
  const [categories, setCategories] = useState([]);
  const [categorieSource, setCategorieSource] = useState("");
  const [categorieDestination, setCategorieDestination] = useState("");
  const [subSource, setSubSource] = useState("");
  const [subDestination, setSubDestination] = useState("");
  const [subsSource, setSubsSource] = useState([]);
  const [subsDestination, setSubsDestination] = useState([]);
  const [montant, setMontant] = useState(0);
  const { token } = useContext(AuthContext);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/budget/categorie/with-subcategories', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
        setRows(transformData(data)); // Update rows with transformed data
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
        setRows([]); // Ensure rows are cleared if there's an error
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchCategories();
  }, [token]);

  const transformData = (categories) => {
    const rows = [];
    categories.forEach(category => {
      category.subCategories.forEach(subCategory => {
        rows.push({
          id: subCategory.id,
          categoryNom: category.nom,
          subCategoryNom: subCategory.nom,
          subCategoryBudget: subCategory.budget,
        });
      });
    });
    return rows;
  };

  const handleSourceCategorieChange = (event) => {
    const selectedCategoryId = event.target.value;
    setCategorieSource(selectedCategoryId);
    const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);
    setSubsSource(selectedCategory ? selectedCategory.subCategories : []);
    setSubSource("");
  };

  const handleDestinationCategorieChange = (event) => {
    const selectedCategoryId = event.target.value;
    setCategorieDestination(selectedCategoryId);
    const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);
    setSubsDestination(selectedCategory ? selectedCategory.subCategories : []);
    setSubDestination("");
  };

  const handleSubSourceChange = (event) => {
    setSubSource(event.target.value);
  };

  const handleSubDestinationChange = (event) => {
    setSubDestination(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ajustement = {
      source: subSource,
      destination: subDestination,
      montant
    };
    try {
      setLoading(true);
      const res = await fetch('/api/budget/ajustement', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ajustement),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      toast.success("Opération réussie");

      // Fetch and update rows
      const fetchCategories = async () => {
        try {
          const res = await fetch('/api/budget/categorie/all', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          const data = await res.json();
          setRows(transformData(data));
        } catch (error) {
          console.error('Error fetching categories:', error);
          setRows([]);
        } finally {
          setLoading(false);
        }
      };

      fetchCategories();

      setCategorieDestination("");
      setCategorieSource("");
      setSubDestination("");
      setSubSource("");
      setMontant(0);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'subCategoryNom', headerName: 'Sous Catégorie', flex: 2 },
    { field: 'categoryNom', headerName: 'Catégorie', flex: 1 },
    { field: 'subCategoryBudget', headerName: 'Budget', flex: 1 },
  ];

  return (
    <Box>
      <Box width="50%" mx="auto">
        <h1 className='text-3xl font-bold text-center mb-7'>Ajustement des budgets</h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="source">Categorie source</InputLabel>
                <Select
                  labelId="source"
                  id="categorie-source"
                  label="Categorie source"
                  value={categorieSource}
                  onChange={handleSourceCategorieChange}
                >
                  {categories.map((categorie) => (
                    <MenuItem key={categorie.id} value={categorie.id}>{categorie.nom}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="sub-source">Sous categorie source</InputLabel>
                <Select
                  labelId="sub-source"
                  id="sub-categorie-source"
                  label="Sous categorie source"
                  value={subSource}
                  onChange={handleSubSourceChange}
                  disabled={!categorieSource}
                >
                  {subsSource.map((subCategorie) => (
                    <MenuItem key={subCategorie.id} value={subCategorie.nom}>{subCategorie.nom}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="destination">Categorie destination</InputLabel>
                <Select
                  labelId="destination"
                  id="categorie-destination"
                  label="Categorie destination"
                  value={categorieDestination}
                  onChange={handleDestinationCategorieChange}
                >
                  {categories.map((categorie) => (
                    <MenuItem key={categorie.id} value={categorie.id}>{categorie.nom}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="sub-destination">Sous categorie destination</InputLabel>
                <Select
                  labelId="sub-destination"
                  id="sub-categorie-destination"
                  label="Sous categorie destination"
                  value={subDestination}
                  onChange={handleSubDestinationChange}
                  disabled={!categorieDestination}
                >
                  {subsDestination.map((subCategorie) => (
                    <MenuItem key={subCategorie.id} value={subCategorie.nom}>{subCategorie.nom}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Montant"
                variant="outlined"
                fullWidth
                type='number'
                value={montant}
                onChange={(event) => { setMontant(Number(event.target.value)) }}
              />
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" type='submit' fullWidth>Confirmer</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Box mt={10}>
        <DataGrid
          rows={rows}
          // @ts-ignore
          columns={columns}
          disableDensitySelector
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              color: theme.palette.primary.main,
            },
          }}
        />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Box>
  )
}

export default BudgetAdjustment;
