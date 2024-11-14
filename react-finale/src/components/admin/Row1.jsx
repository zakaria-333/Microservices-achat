import { Paper, Stack, Typography } from '@mui/material';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import AddHomeWorkOutlinedIcon from '@mui/icons-material/AddHomeWorkOutlined';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../authRouter/AuthContext'; // Adjust import as needed

const Row1 = () => {
  const [userCount, setUserCount] = useState(0);
  const [filialeCount, setFilialeCount] = useState(0);
  const [siteCount, setSiteCount] = useState(0);
  const { token } = useContext(AuthContext); // Get token from context

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [userResponse, filialeResponse, siteResponse] = await Promise.all([
          axios.get('/api/user/all', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('/api/demande/filiale/all', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('/api/demande/site/all', {
            headers: { Authorization: `Bearer ${token}` }
          }),
        ]);
  
        setUserCount(userResponse.data.length);
        setFilialeCount(filialeResponse.data.length);
        setSiteCount(siteResponse.data.length);
  
        console.log('User Count:', userResponse.data.length);
        console.log('Filiale Count:', filialeResponse.data.length);
        console.log('Site Count:', siteResponse.data.length);
  
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };
  
    fetchCounts();
  }, [token]); // Add token as a dependency to refetch if it changes
  

  return (
    <Stack direction={'row'} sx={{ justifyContent: 'center', mt: '30px' }}>
      <Paper sx={{ minWidth: '31%', mr: '20px', p: 1.5, display: 'flex', justifyContent: 'space-between' }}>
        <Stack gap={1}>
          <AccountBoxOutlinedIcon sx={{ width: '50px', height: '50px' }} />
          <Typography sx={{ fontSize: '20px' }}>Nombre d'utilisateurs</Typography>
        </Stack>
        <Stack gap={1}>
          <Typography sx={{ fontSize: '30px', m: '20px' }}>{`+${userCount}`}</Typography>
        </Stack>
      </Paper>
      <Paper sx={{ minWidth: '31%', mr: '20px', p: 1.5, display: 'flex', justifyContent: 'space-between' }}>
        <Stack gap={1}>
          <ApartmentOutlinedIcon sx={{ width: '50px', height: '50px' }} />
          <Typography sx={{ fontSize: '20px' }}>Total des filiales</Typography>
        </Stack>
        <Stack gap={1}>
          <Typography sx={{ fontSize: '30px', m: '20px' }}>{`+${filialeCount}`}</Typography>
        </Stack>
      </Paper>
      <Paper sx={{ minWidth: '31%', mr: '16px', p: 1.5, display: 'flex', justifyContent: 'space-between' }}>
        <Stack gap={1}>
          <AddHomeWorkOutlinedIcon sx={{ width: '50px', height: '50px' }} />
          <Typography sx={{ fontSize: '20px' }}>Total des sites</Typography>
        </Stack>
        <Stack gap={1}>
          <Typography sx={{ fontSize: '30px', m: '20px' }}>{`+${siteCount}`}</Typography>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Row1;
