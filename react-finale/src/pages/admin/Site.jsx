import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../authRouter/AuthContext";
import axios from "axios";
import PopUp from "../../components/admin/PopUpSite";
import AlertDeleteSite from "../../components/admin/AlertDeleteSite";
import Loading from "../../components/Loading"; // Import the Loading component

const Site = () => {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { token } = useContext(AuthContext);

  const fetchData = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get('/api/demande/site/all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const transformedData = response.data.map((item, index) => ({
        num: index + 1,
        id: item.id,
        code: item.code,
        nom: item.nom,
        ville: item.ville,
        idFiliale: item.filiale.id,
        filiale: item.filiale.nom
      }));

      setRows(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // End loading
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
        <PopUp action={'Add Site'} data={''} onSuccess={fetchData} />
      </GridToolbarContainer>
    );
  };

  const columns = [
    { field: 'num', headerName: 'Id', width: 80, align: 'center', headerAlign: 'center', headerClassName: 'header-bold' },
    { field: 'code', headerName: 'Code', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold' },
    { field: 'nom', headerName: 'Nom', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold' },
    { field: 'ville', headerName: 'Ville', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold' },
    { field: 'filiale', headerName: 'Filiale', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold' },
    {
      field: 'col5', headerName: 'Modifier', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold',
      renderCell: (params) => (
        <PopUp action={'Update'} data={params.row} onSuccess={fetchData} />
      )
    },
    {
      field: 'col6', headerName: 'Supprimer', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold',
      renderCell: (params) => (
        <AlertDeleteSite
          text1={'Etes-vous sûr de vouloir supprimer ce site ?'}
          text2={'Après avoir cliqué sur Accepter, ce site sera définitivement supprimé et ne pourra pas être récupéré.'}
          id={params.row.id}
          onSuccess={fetchData}
        />
      )
    },
  ];

  return (
    <div style={{ height: 600, width: '100%' }}>
      {loading ? (
        <Loading /> // Display Loading component while loading
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

export default Site;
