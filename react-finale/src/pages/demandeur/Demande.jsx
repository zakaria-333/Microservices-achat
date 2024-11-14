import { Box, Button, Chip, useTheme, Backdrop, CircularProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState, useContext, useEffect } from 'react';
import DetailPoPup from '../../components/demandeur/DetailPoPup';
import FormDialog from '../../components/demandeur/FormDialog';
import AuthContext from '../../authRouter/AuthContext';

const Demande = () => {
  const theme = useTheme();
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [categories, setCategories] = useState([]);
  const { token, user } = useContext(AuthContext);
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDemandes = async () => {
      setLoading(true); // Start loading
      try {
        const res = await fetch(`/api/demande/all/${user.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setDemandes(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des demandes:', error);
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchDemandes();
  }, [add]); // Include user.id and token as dependencies

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseForm = () => {
    setAdd(false);
  };

  const handleCreateDemande = async () => {
    try {
      const res = await fetch('/api/budget/categorie/with-subcategories', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []); // Ensure data is an array
      setAdd(true);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const columns = [
    { field: 'id', headerName: 'Id', width: 100, type: 'number' },
    { field: 'code', headerName: 'Code', width: 100 },
    { field: 'proprietaire', headerName: 'Proprietaire', width: 150 },
    { field: 'date', headerName: 'Date', width: 100 },
    { field: 'description', headerName: 'Description', width: 250 },
    {
      field: 'categorie', headerName: 'Categorie', width: 200,
      valueGetter: (value, row) => {
        return `${row.details[0]?.subCategorie.categorie.nom}`;
      },
    },
    {
      field: 'etat',
      headerName: 'Etat',
      width: 150,
      type: 'text',
      align: 'center',
      headerAlign: 'center',
      valueGetter: (value, row) => {
        const { confirmationDg, confirmationCd, confirmationDaf, confirmationAchat } = row;

        if ([confirmationDg, confirmationCd, confirmationDaf, confirmationAchat].includes('refusé')) {
          return "Refusé";
        }

        if ([confirmationDg, confirmationCd, confirmationDaf, confirmationAchat].includes('en cours')) {
          return "En cours";
        }

        if ([confirmationDg, confirmationCd, confirmationDaf, confirmationAchat].every(status => status === 'validé')) {
          return "Validé";
        }

        return "Non défini";
      },

      renderCell: (params) => {
        const { confirmationDg, confirmationCd, confirmationDaf, confirmationAchat } = params.row;

        if ([confirmationDg, confirmationCd, confirmationDaf, confirmationAchat].includes('refusé')) {
          return <Chip label="Refusé" color="error" clickable />;
        }

        if ([confirmationDg, confirmationCd, confirmationDaf, confirmationAchat].includes('en cours')) {
          return <Chip label="En cours" color="warning" clickable />;
        }

        if ([confirmationDg, confirmationCd, confirmationDaf, confirmationAchat].every(status => status === 'validé')) {
          return <Chip label="Validé" color="success" clickable />;
        }

        return <Chip label="Non défini" color="default" />;
      }
    }
  ];

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpen(true);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" marginBottom={3}>
        <Button
          variant="outlined"
          onClick={handleCreateDemande}
          sx={{
            color: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
          }}
        >
          Créer une demande
        </Button>
      </Box>
      <DataGrid
        rows={demandes}
        // @ts-ignore
        columns={columns}
        disableDensitySelector
        onRowClick={handleRowClick}
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
      <DetailPoPup open={open} handleClose={handleClose} rowData={selectedRow} />
      <FormDialog open={add} handleClose={handleCloseForm} categories={categories} />

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Demande;
