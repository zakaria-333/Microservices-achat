import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../authRouter/AuthContext';
import { Backdrop, Box, CircularProgress, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const HistroriqueAdjustment = () => {
  const [histroriqueAdjustment, setHistoriqueAdjustment] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const theme = useTheme();


  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/budget/historique-ajustement', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setHistoriqueAdjustment(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching :', error);
        setHistoriqueAdjustment([]);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory()
  }, [])

  const columns = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'source', headerName: 'Sous Catégorie Source', flex: 2 },
    { field: 'destination', headerName: 'Sous Catégorie Destination', flex: 1 },
    { field: 'montant', headerName: 'Montant', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
  ];

  return (
    <Box>
      <DataGrid
          rows={histroriqueAdjustment}
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
  )
}

export default HistroriqueAdjustment
