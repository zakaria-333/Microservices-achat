import { Backdrop, Box, Card, CircularProgress, Grid } from '@mui/material';
import { FaRegFolderOpen } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaCheckCircle } from "react-icons/fa";
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../authRouter/AuthContext';

const HomeDaf = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const size = {
    width: 300,
    height: 300,
  };

  const fetchDemandes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/demande/all', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setDemandes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching demandes:', error);
      setDemandes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  const today = new Date().toISOString().split('T')[0];

  const totalDemandes = demandes.length;
  const totalDemandesToday = demandes.filter(d => d.date === today).length;
  const totalRefused = demandes.filter(d =>
    [d.confirmationAchat, d.confirmationCd, d.confirmationDaf, d.confirmationDg].includes('refusé')
  ).length;
  const totalValid = demandes.filter(d =>
    d.confirmationAchat === 'validé' &&
    d.confirmationCd === 'validé' &&
    d.confirmationDaf === 'validé' &&
    d.confirmationDg === 'validé'
  ).length;

  const demandeurs = demandes.reduce((acc, d) => {
    const demandeur = `${d.demandeur.nom} ${d.demandeur.prenom}`;
    acc[demandeur] = (acc[demandeur] || 0) + 1;
    return acc;
  }, {});


  const topDemandeur = Object.keys(demandeurs).reduce((a, b) => demandeurs[a] > demandeurs[b] ? a : b, '');

  const sites = demandes.reduce((acc, d) => {
    const site = d.demandeur.site.nom;
    acc[site] = (acc[site] || 0) + 1;
    return acc;
  }, {});

  const topSite = Object.keys(sites).reduce((a, b) => sites[a] > sites[b] ? a : b, '');

  const categories = demandes.reduce((acc, d) => {
    if (d.details.length > 0) {
      const detail = d.details[0]; // Access the first element of the details array
      const category = detail.subCategorie.categorie.nom;
      acc[category] = (acc[category] || 0) + 1;
    }
    return acc;
  }, {});


  const pieData = Object.entries(categories).map(([label, value]) => ({ label, value }));

  return (
    <Box sx={{ display: "flex", alignItems: "center", height: "80vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card elevation={4}>
            <div className='flex gap-1'>
              <div className='bg-violet-400 p-6'>
                <FaFileAlt size={25} color='white' />
              </div>
              <div className='flex flex-col justify-center pl-4'>
                <h1 className='text-sm'>Total des demandes du jour</h1>
                <p className='text-2xl font-bold'>{totalDemandesToday}</p>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card elevation={4}>
            <div className='flex gap-1'>
              <div className='bg-blue-400 p-6'>
                <FaRegFolderOpen size={25} color='white' />
              </div>
              <div className='flex flex-col justify-center pl-4'>
                <h1 className='text-sm'>Total des demandes</h1>
                <p className='text-2xl font-bold'>{totalDemandes}</p>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card elevation={4}>
            <div className='flex gap-1'>
              <div className='bg-green-400 p-6'>
                <FaCheckCircle size={25} color='white' />
              </div>
              <div className='flex flex-col justify-center pl-4'>
                <h1 className='text-sm'>Demandes acceptées</h1>
                <p className='text-2xl font-bold'>{totalValid}</p>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card elevation={4}>
            <div className='flex gap-1'>
              <div className='bg-rose-400 p-6'>
                <TiDelete size={25} color='white' />
              </div>
              <div className='flex flex-col justify-center pl-4'>
                <h1 className='text-sm'>Demandes refusées</h1>
                <p className='text-2xl font-bold'>{totalRefused}</p>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item xs={6} md={4}>
          <Card elevation={4} sx={{ padding: 1 }}>
            <h1 className='font-bold text-lg text-gray-400'>Suivi des Dépenses Mensuelles</h1>
            <LineChart
              xAxis={[{ data: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"] }]} // Mois sur l'axe X
              series={[
                {
                  data: [300, 450, 600, 750, 500, 900],  // Montants d'argent sur l'axe Y
                },
              ]}
              height={300}
              margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
              grid={{ horizontal: true }}
            />
          </Card>
        </Grid>
        <Grid item xs={6} md={4}>
          <Card elevation={4} sx={{ padding: 1 }}>
            <h1 className='font-bold text-lg text-gray-400'>Demandes par catégorie</h1>
            <PieChart
              series={[
                {
                  data: pieData,
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  highlightScope: { faded: 'global', highlighted: 'item' },
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: 'white',
                  fontWeight: 'bold',
                },
              }}
              {...size}
            />
          </Card>
        </Grid>
        <Grid item xs={6} md={4}>
          <div className='flex flex-col gap-3 h-full'>
            <Card elevation={4} className="flex-1 flex p-3">
              <div>
                <h1 className='font-bold text-lg text-gray-400'>Demandeur le plus actif</h1>
                <Table aria-label="simple table" sx={{ width: 350 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nom</TableCell>
                      <TableCell align="right">Nombre de demande</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{topDemandeur}</TableCell>
                      <TableCell align="right">{demandeurs[topDemandeur]}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>
            <Card elevation={4} className="flex-1 flex p-3">
              <div>
                <h1 className='font-bold text-lg text-gray-400'>Site le plus sollicité</h1>
                <Table aria-label="simple table" sx={{ width: 350 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Site</TableCell>
                      <TableCell align="right">Nombre de demande</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{topSite}</TableCell>
                      <TableCell align="right">{sites[topSite]}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

export default HomeDaf;
