import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import '../../index.css';
import { Box, Typography, useTheme, Avatar } from "@mui/material";
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import PopUp from "../../components/admin/PopUp";
import AlertDeleteUser from "../../components/admin/AlertDeleteUser";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../authRouter/AuthContext";
import axios from "axios";
import Loading from "../../components/Loading"; // Import the Loading component

const User = () => {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { token } = useContext(AuthContext);

  const fetchData = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get('/api/user/all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const users=response.data;

      const transformedData = users.map((item, index) => {
        const base64Image = `data:image/jpeg;base64,${item.photo}`;
        return ({
          num: index + 1,
          id: item.id,
          picture: base64Image,
          nom: item.nom,
          prenom: item.prenom,
          username: item.username,
          mdp: item.mdp,
          email: item.email,
          role: item.role.title,
          roleId: item.role.id,
          site: (item.role.title === 'Demandeur' || item.role.title === 'D.Site') ? item.site.nom : 'SIEGE',
          siteId: (item.role.id === 3 || item.role.id === 6) ? item.site.id : null,
        });
      });
      

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

  const columns = [
    { field: 'num', headerName: 'ID', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold' },
    {
      field: 'picture', headerName: 'Photo', width: 80, align: 'center', headerAlign: 'center', headerClassName: 'header-bold',
      renderCell: ({ row: { picture } }) => (
        <Avatar sx={{ mx: "auto", width: 40, height: 40, border: "1px solid grey", my: 1 }} alt="Profile" src={picture} />
      )
    },
    { field: 'nom', headerName: 'Prénom', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold' },
    { field: 'prenom', headerName: 'Nom', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold' },
    { field: 'username', headerName: "Mot d'utilisateur", width: 110, align: 'center', headerAlign: 'center', headerClassName: 'header-bold' },
    { field: 'email', headerName: 'Email', width: 220, align: 'center', headerAlign: 'center', headerClassName: 'header-bold' },
    {
      field: 'role', headerName: 'Role', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold',
      renderCell: ({ row: { role } }) => (
        <Box
          sx={{
            mt: '8px',
            p: '8px',
            width: '100px',
            borderRadius: '3px',
            textAlign: 'center',
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: role === 'Demandeur' ? theme.palette.warning.light : role === 'D.Achat' ? theme.palette.secondary.main : role === 'D.Generale' ? theme.palette.primary.main : role === 'D.Site' ? theme.palette.warning.dark : theme.palette.info.dark
          }}>
          <VerifiedUserOutlinedIcon fontSize="small" />
          <Typography sx={{ fontSize: '13px' }}>{role}</Typography>
        </Box>
      )
    },
    { field: 'site', headerName: 'Site', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold' },
    {
      field: 'col8', headerName: 'Modifier', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold',
      renderCell: (params) => (
        <PopUp action={'Update'} data={params.row} onSuccess={fetchData} />
      )
    },
    {
      field: 'col9', headerName: 'Supprimer', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'header-bold',
      renderCell: (params) => (
        <AlertDeleteUser
          text1={'Etes-vous sûr de vouloir supprimer cet utilisateur ?'}
          text2={'Après avoir cliqué sur Accepter, cet utilisateur sera définitivement supprimé et ne pourra pas être récupéré.'}
          id={params.row.id}
          onSuccess={fetchData}
        />
      )
    },
  ];

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <GridToolbar />

        <GridToolbarQuickFilter sx={{mt:'10px'}} />
        <PopUp action={'Add User'} data={''} onSuccess={fetchData} />
      </GridToolbarContainer>
    );
  };

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
};

export default User;
