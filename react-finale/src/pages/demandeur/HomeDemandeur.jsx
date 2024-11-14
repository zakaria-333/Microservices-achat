import { Backdrop, Box, Card, CardContent, CardHeader, Chip, CircularProgress, Divider, Grid, Stack, Step, StepLabel, Stepper, Typography, useStepContext, useTheme } from "@mui/material"
import { Carousel } from "flowbite-react";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdTimer } from "react-icons/md";
import { BiFolderOpen } from "react-icons/bi";
import { PieChart } from '@mui/x-charts/PieChart';
import { useContext, useEffect, useState } from "react";
import AuthContext from '../../authRouter/AuthContext';
import { RingLoader } from 'react-spinners';

const HomeDemandeur = () => {
  const theme = useTheme()
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalDemande, setTotalDemande] = useState(0);
  const [totalRejected, setTotalRejected] = useState(0);
  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalWaiting, setTotalWaiting] = useState(0);
  const { token, user } = useContext(AuthContext);
  const [demandesEnCours, setDemandesEnCours] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState([]);


  useEffect(() => {
    const fetchDemandes = async () => {
      setLoading(true);
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
        calculateTotals(data);
        filterDemandesEnCours(data);
        calculateCategoryCounts(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des demandes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDemandes();
  }, []);

  const calculateTotals = (demandes) => {
    let rejected = 0, confirmed = 0, waiting = 0;

    demandes.forEach(demande => {
      const { confirmationDg, confirmationCd, confirmationDaf, confirmationAchat } = demande;

      if ([confirmationDg, confirmationCd, confirmationDaf, confirmationAchat].includes('refusé')) {
        rejected += 1;
        return; // Passe à la prochaine itération
      }

      if ([confirmationDg, confirmationCd, confirmationDaf, confirmationAchat].includes('en cours')) {
        waiting += 1;
        return; // Passe à la prochaine itération
      }

      if ([confirmationDg, confirmationCd, confirmationDaf, confirmationAchat].every(status => status === 'validé')) {
        confirmed += 1;
      }
    });

    setTotalDemande(demandes.length);
    setTotalRejected(rejected);
    setTotalConfirmed(confirmed);
    setTotalWaiting(waiting);
  };


  const determineStage = (confirmationDg, confirmationCd, confirmationDaf, confirmationAchat) => {
    const allInProgress = [confirmationDg, confirmationCd, confirmationDaf, confirmationAchat].every(status => status === 'en cours');
    const anyInProgress = [confirmationDg, confirmationCd, confirmationDaf, confirmationAchat].some(status => status === 'en cours');
    const anyRejected = [confirmationDg, confirmationCd, confirmationDaf, confirmationAchat].some(status => status === 'refusé');
    const cdConfirmed = confirmationCd === 'validé';
    const achatConfirmed = confirmationAchat === 'validé';
    const dafConfirmed = confirmationDaf === 'validé';
    const dgConfirmed = confirmationDg === 'validé';


    if (dgConfirmed) return 4;
    if (cdConfirmed && achatConfirmed && dafConfirmed) return 3;
    if (cdConfirmed && achatConfirmed) return 2;
    if (cdConfirmed) return 1;
    if (anyInProgress && !anyRejected) return 0;

    return -1;
  };



  const filterDemandesEnCours = (demandes) => {
    const enCours = demandes.filter(demande => {
      const { confirmationDg, confirmationCd, confirmationDaf, confirmationAchat } = demande;
      const confirmations = [confirmationDg, confirmationCd, confirmationDaf, confirmationAchat];
      return confirmations.some(status => status === 'en cours') && !confirmations.some(status => status === 'refusé');
    });
    setDemandesEnCours(enCours);
  };


  const calculateCategoryCounts = (demandes) => {
    const counts = demandes.reduce((acc, demande) => {
      const category = demande.details[0].subCategorie.categorie.nom;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += 1;
      return acc;
    }, {});

    const formattedCounts = Object.entries(counts).map(([label, value], id) => ({ id, value, label }));
    setCategoryCounts(formattedCounts);
  };



  const mode = theme.palette.mode;
  const steps = [
    'Validé par Responsable',
    "Validé par Département d'achat",
    'Validé par DAF',
    "Validé par Directeur géneral"
  ];
  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
        <Card elevation={4}>
          <CardHeader
            sx={{ color: theme.palette.primary.dark }}
            avatar={<BiFolderOpen size={30} />}
            titleTypographyProps={{ variant: "h5" }}
            title="Total commandes"
          />
          <CardContent>
            <Typography align="center" variant="h4">{totalDemande}</Typography>
          </CardContent>
        </Card>

        <Card elevation={4}>
          <CardHeader
            sx={{ color: theme.palette.warning.main }}
            avatar={<MdTimer size={30} />}
            titleTypographyProps={{ variant: "h5" }}
            title="Demande en cours"
          />
          <CardContent>
            <Typography align="center" variant="h4">{totalWaiting}</Typography>
          </CardContent>
        </Card>

        <Card elevation={4}>
          <CardHeader
            sx={{ color: theme.palette.success.main }}
            avatar={<AiFillCheckCircle size={30} />}
            titleTypographyProps={{ variant: "h5" }}
            title="Demande acceptée"
          />
          <CardContent>
            <Typography align="center" variant="h4">{totalConfirmed}</Typography>
          </CardContent>
        </Card>

        <Card elevation={4}>
          <CardHeader
            sx={{ color: theme.palette.error.dark }}
            avatar={<AiFillCloseCircle size={30} />}
            titleTypographyProps={{ variant: "h5" }}
            title="Demande refusée"
          />
          <CardContent>
            <Typography align="center" variant="h4">{totalRejected}</Typography>
          </CardContent>
        </Card>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={9}>
          <div className="h-80 rounded-lg shadow-lg border-2 border-blue-200">
            {demandesEnCours.length > 0 ? (

              <Carousel slide={false}>
                {demandesEnCours.map((demande, index) => {
                  const { code, description, montant, confirmationDg, confirmationCd, confirmationDaf, confirmationAchat, date } = demande;
                  const stage = determineStage(confirmationDg, confirmationCd, confirmationDaf, confirmationAchat);

                  return (
                    <div key={index} className={`${mode === 'dark' ? 'bg-gradient-to-r from-slate-600' : "bg-gray-100"} flex flex-col justify-between h-full px-24 py-11`}>
                      <div className="flex justify-between text-xl font-bold my-0">
                        <h1>{code}</h1>
                        <h3>{date}</h3>
                      </div>
                      <div className="flex justify-between">
                        <p>
                          <span className="font-bold">Description : </span> {description}
                        </p>
                        <div>
                          {demande.details?.map((detail) => (
                            <Chip
                              key={detail.id.subCategorieId} // Use a unique key for each Chip
                              label={detail.subCategorie.nom} // Display the subcategory name
                              sx={{ margin: '4px' }} // Add some spacing between chips
                            />
                          ))}
                        </div>
                      </div>
                      <Stepper activeStep={stage} alternativeLabel>
                        {steps.map((label, stepIndex) => (
                          <Step key={stepIndex}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </div>
                  );
                })}
              </Carousel>

            ) : (
              <div className="flex justify-center items-center h-full">
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                  <RingLoader
                    color={"#bfdbfe"}
                    loading={true}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  <Typography variant="h6" sx={{ marginTop: 2 }}>
                    Pas de demandes en cours à l'instant
                  </Typography>
                </Box>
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={3}>
          <Card elevation={4} sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
            <PieChart
              series={[
                {
                  data: categoryCounts,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
              ]}
              height={150}
            />
          </Card>
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  )
}

export default HomeDemandeur
