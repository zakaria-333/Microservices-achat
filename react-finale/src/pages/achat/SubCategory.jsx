
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid"
import '../../index.css'

import { Box, Typography, useTheme, Avatar } from "@mui/material";
import AlertDelete from "../../components/admin/AlertDeleteFiliale.jsx";
import PopUp from "../../components/achat/PopUpSubCategory";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../authRouter/AuthContext";
import axios from "axios";
import Loading from "../../components/Loading";
import AlertDeleteSub from "../../components/achat/AlertDeleteSub";








const SubCategory = () => {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
const [loading, setLoading] = useState(true); // Add loading state
const { token } = useContext(AuthContext);


const fetchData = async () => {
  setLoading(true); // Start loading
  try {
    const response = await axios.get('/api/budget/subcategorie/all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const transformedData = response.data.map((item, index) => ({
      num: index + 1,
      id: item.id,
      code: item.code,
      nom: item.nom,
      budget: item.budget,
      categorie: item.categorie.nom,
      categorieid:item.categorie.id
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
        <PopUp action='Add SubCategory' data={''} onSuccess={fetchData} />

      </GridToolbarContainer>
    );
  };

  // definition des colums et aussi le styla la fct par fois de chaque colums
  const columns = [
    { field: 'num', headerName: 'Id', width: 80, align: 'center', headerAlign: 'center', headerClassName: 'header-bold' },
    { field: 'code', headerName: 'Code', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold' },
    { field: 'nom', headerName: 'Nom', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold' },
    { field: 'budget', headerName: 'budget', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold' },
    { field: 'categorie', headerName: 'Categorie', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold' },
    {
      field: 'col5', headerName: 'modifier', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold',

      renderCell: (params) => {
        return (
          <PopUp action='Update' data={params.row} onSuccess={fetchData} />
        )
      }
    },
    {
      field: 'col6', headerName: 'supprimer', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold',
      renderCell: (params) => {
        return (<AlertDeleteSub text1={'Etes-vous sûr de vouloir supprimer cette sous-catégorie ?'} text2={'Après avoir cliqué sur Accepter, cette sous-catégorie sera définitivement supprimée et ne pourra pas être récupérée.'} id={params.row.id} onSuccess={fetchData} />
        )
      }
    },

  ];

  return (
    <div style={{ height: 600, width: '100%' }}>
      {loading ? (
        <Loading /> // Display Loading component while loading
      ) : (<DataGrid
        slots={{ toolbar: CustomToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true, // Enable the search feature
            quickFilterProps: { debounceMs: 500 }, // Optional: Add debounce for better performance
          },
        }}
        rows={rows}
        // @ts-ignore
        columns={columns} />)}
    </div>
  )
}

export default SubCategory

