import { useEffect, useState, useContext } from 'react';
import { Box } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import AuthContext from '../../../authRouter/AuthContext';

const DemandeurStatics = () => {
  const { token, user } = useContext(AuthContext); // Assume user has site info
  const [demandeurData, setDemandeurData] = useState([]);
  const [loading, setLoading] = useState(true); // For handling loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all demandeurs by site
        const demandeursResponse = await fetch(`/api/user/demandeurBySite/${user.site.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!demandeursResponse.ok) {
          throw new Error('Failed to fetch demandeurs');
        }

        const demandeurs = await demandeursResponse.json();

        // Fetch the number of demands for each demandeur
        const demandeurData = await Promise.all(
          demandeurs.map(async (demandeur) => {
            const demandesResponse = await fetch(`/api/demande/byDemandeur`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify(demandeur),
            });

            if (!demandesResponse.ok) {
              throw new Error(`Failed to fetch demandes for demandeur ${demandeur.nom}`);
            }

            const demandes = await demandesResponse.json();

            // Return demandeur name and number of demands
            return {
              id: demandeur.id,
              label: demandeur.nom, // Demandeur name for the pie chart
              value: demandes.length, // Number of demands
            };
          })
        );

        // Set the data for the pie chart
        setDemandeurData(demandeurData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token, user.site.id]);

  // Show loading state or pie chart
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ height: '70vh', paddingBottom: '80px' }}>
      <h1 className="text-center font-bold text-xl underline">
        Nombre de demandes par Demandeur pour {user.site.nom}
      </h1>
      <PieChart
        series={[
          {
            data: demandeurData, // Data for the pie chart
          },
        ]}
        width={760}
        height={400}
        sx={{justifyContent:'center',alignItems:'center',mt:'30px'}}
      />
    </Box>
  );
};

export default DemandeurStatics;
