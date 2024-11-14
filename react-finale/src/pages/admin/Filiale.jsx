import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../authRouter/AuthContext";
import axios from "axios";
import PopUp from "../../components/admin/PopUpFiliale";
import AlertDeleteFiliale from "../../components/admin/AlertDeleteFiliale";
import Loading from "../../components/Loading";

const Filiale = () => {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/demande/filiale/all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const transformedData = response.data.map((item, index) => ({
        num: index + 1,
        id: item.id,
        code: item.code,
        nom: item.nom,
      }));

      setRows(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>

          <GridToolbar />
        <GridToolbarQuickFilter sx={{mt:'10px'}} />
        <PopUp action='Add Subsidiary' data={''} onSuccess={fetchData} />
      </GridToolbarContainer>
    );
  };
  const columns = [
    { field: 'num', headerName: 'Id', width: 80, align: 'center', headerAlign: 'center', headerClassName: 'header-bold' },
    { field: 'code', headerName: 'Code', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold' },
    { field: 'nom', headerName: 'Nom', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold' },
    {
      field: 'col3', headerName: 'Modifier', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold',
      renderCell: (params) => (
        <PopUp action='Update' data={params.row} onSuccess={fetchData} />
      )
    },
    {
      field: 'col4', headerName: 'Supprimer', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold',
      renderCell: (params) => (
        <AlertDeleteFiliale
          text1={'Etes-vous sûr de vouloir supprimer cette filiale ?'}
          text2={'Après avoir cliqué sur Accepter, cette filiale sera définitivement supprimée et ne pourra pas être récupérée.'}
          id={params.row.id}
          onSuccess={fetchData}
        />
      )
    },
  ];

  return (
    <div style={{ height: 600, width: '100%' }}>
      {loading ? (
        <Loading />
      ) : (
        <DataGrid
          slots={{ toolbar: CustomToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true, // Enable the search feature
              quickFilterProps: { debounceMs: 500 }, // Optional: Add debounce for better performance
            },
          }}
          rows={rows}
          // @ts-ignore
          columns={columns}

        />
      )}
    </div>
  );
}

export default Filiale;
