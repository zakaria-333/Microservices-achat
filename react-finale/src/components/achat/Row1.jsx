import { Paper, Stack, Typography, useTheme } from '@mui/material';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../authRouter/AuthContext'; // Adjust import as needed

const Row1 = () => {
  const theme = useTheme();
  const [fournisseurCount, setFournisseurCount] = useState(0);
  const [demandeCount, setDemandeCount] = useState(0);
  const [valideCount, setValideCount] = useState(0);
  const [refuseCount, setRefuseCount] = useState(0);
  const [enCoursCount, setEnCoursCount] = useState(0);
  const { token, user } = useContext(AuthContext); // Get token from context

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [demandeResponse,fournisseurResponse ] = await Promise.all([
          axios.get('/api/demande/all', {
            headers: { Authorization: `Bearer ${token}` }
          }),

          axios.get('/api/demande/fournisseur/all', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          
        ]);

       

        // Process demandes
        const demandes = demandeResponse.data;
        setDemandeCount(demandes.length);

        const fourniseurs=fournisseurResponse.data;

        setFournisseurCount(fourniseurs.length);
        

        // Classify demandes
        const valideCount = demandes.filter(demande => demande.confirmationAchat === 'validé').length;
        const refuseCount = demandes.filter(demande => demande.confirmationAchat === 'refusé').length;
        const enCoursCount = demandes.filter(demande =>demande.confirmationCd === 'validé' && demande.confirmationAchat === 'en cours').length;

        setValideCount(valideCount);
        setRefuseCount(refuseCount);
        setEnCoursCount(enCoursCount);

        console.log('Demande Count:', demandes.length);
        console.log('Valide Count:', valideCount);
        console.log('Refuse Count:', refuseCount);
        console.log('En cours Count:', enCoursCount);

      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, [token, user]); // Added user.site.id as a dependency

  return (
    <Stack direction={'row'} sx={{ justifyContent: 'center', mt: '30px' }}>


      <Paper sx={{ minWidth: '18%', mr: '20px', p: 1.5, display: 'flex', justifyContent: 'space-between' }}>
        <Stack gap={1}>
          <AccountBoxOutlinedIcon sx={{ width: '50px', height: '50px', color: theme.palette.mode=='dark'?theme.palette.common.white:theme.palette.common.black  }} />
          <Typography sx={{ fontSize: '20px' }}>Fournisseurs</Typography>
        </Stack>
        <Stack gap={1}>
          <Typography sx={{ fontSize: '30px', m: '20px' }}>{`+${fournisseurCount}`}</Typography>
        </Stack>
      </Paper>
      <Paper sx={{ minWidth: '18%', mr: '20px', p: 1.5, display: 'flex', justifyContent: 'space-between' }}>
        <Stack gap={1}>
          <MailOutlineOutlinedIcon sx={{ width: '50px', height: '50px', color: theme.palette.warning.light }} />
          <Typography sx={{ fontSize: '20px' }}>Demandes</Typography>
        </Stack>
        <Stack gap={1}>
          <Typography sx={{ fontSize: '30px', m: '20px' }}>{`+${demandeCount}`}</Typography>
        </Stack>
      </Paper>
      <Paper sx={{ minWidth: '18%', mr: '16px', p: 1.5, display: 'flex', justifyContent: 'space-between' }}>
        <Stack gap={1}>
          <CheckCircleOutlineOutlinedIcon sx={{ width: '50px', height: '50px', color: theme.palette.success.light }} />
          <Typography sx={{ fontSize: '20px' }}>Validés</Typography>
        </Stack>
        <Stack gap={1}>
          <Typography sx={{ fontSize: '30px', m: '20px' }}>{`+${valideCount}`}</Typography>
        </Stack>
      </Paper>
      <Paper sx={{ minWidth: '18%', mr: '16px', p: 1.5, display: 'flex', justifyContent: 'space-between' }}>
        <Stack gap={1}>
          <CancelOutlinedIcon sx={{ width: '50px', height: '50px', color: theme.palette.error.light }} />
          <Typography sx={{ fontSize: '20px' }}>Refusés</Typography>
        </Stack>
        <Stack gap={1}>
          <Typography sx={{ fontSize: '30px', m: '20px' }}>{`+${refuseCount}`}</Typography>
        </Stack>
      </Paper>
      <Paper sx={{ minWidth: '18%', mr: '16px', p: 1.5, display: 'flex', justifyContent: 'space-between' }}>
        <Stack gap={1}>
          <HourglassBottomOutlinedIcon sx={{ width: '50px', height: '50px', color: theme.palette.primary.light }} />
          <Typography sx={{ fontSize: '20px' }}>En cours</Typography>
        </Stack>
        <Stack gap={1}>
          <Typography sx={{ fontSize: '30px', m: '20px' }}>{`+${enCoursCount}`}</Typography>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Row1;
