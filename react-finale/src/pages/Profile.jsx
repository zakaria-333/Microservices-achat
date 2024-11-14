import { Avatar, Box, Button, Card, Container, CssBaseline, Grid, TextField, useTheme } from '@mui/material';
import Picture from '../components/admin/Picture';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import React, { useContext } from 'react';
import AuthContext from '../authRouter/AuthContext';
import SnackNar from '../components/SnackNar';

const Profile = () => {
  const { user, update, token } = useContext(AuthContext); // Include token from AuthContext

  const [nom, setNom] = React.useState(user.nom || '');
  const [prenom, setPrenom] = React.useState(user.prenom || '');
  const [email, setEmail] = React.useState(user.email);
  const [username, setUsername] = React.useState(user.username || '');
  const [id, setId] = React.useState(user.id || '');
  const [mdp, setMdp] = React.useState(user.mdp || '');
  const [role, setRole] = React.useState(user.role || {}); // Store the whole role object
  const [site, setSite] = React.useState(user.site ? user.site.nom : '');
  const [siteObject, setSiteObject] = React.useState(user.site);
  const base64Image = `data:image/jpeg;base64,${user.photo}`;
  const [photo, setPhoto] = React.useState(base64Image || '');
  const [open, setOpen] = React.useState(false)

  const theme = useTheme();

  const handleUpdateProfile = async () => {
    const updatedUser = {
      id,
      nom,
      prenom,
      email,
      username,
      mdp,
      photo: photo.split(',')[1], // Extract base64 part from data URI
      role,
      ...((user.role.title === 'Demandeur' || user.role.title === 'D.Site') ? { site: siteObject } : {}),
    };

    let url = '';
    if (user.role.title === 'Demandeur') {
      url = '/api/user/demandeur/update';
    } else if (user.role.title === 'D.Site') {
      url = '/api/user/ds/update';
    } else {
      url = '/api/user/update';
    }

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const result = await response.json();
        if (result) {
          setOpen(true);
          update(result); // Update user context
          localStorage.setItem('user', JSON.stringify(result));
          // Optionally, update the user context here
        } else {
          alert('Impossible de mettre à jour le profil');
        }
      } else {
        alert('Impossible de mettre à jour le profil');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Impossible de mettre à jour le profil');
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Card sx={{ boxShadow: 10, maxWidth: 800, mx: "auto" }}> {/* Centering the Card and setting maxWidth */}
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '42ch' }, justifyContent: 'center'
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <div className='flex flex-col mb-4'>
                <Avatar sx={{ mx: "auto", width: 120, height: 120, border: "1px solid grey", my: 1 }} alt="Profile"
                  src={photo}
                />
                <div className='text-center'>
                  <Picture setPhoto={setPhoto} />
                </div>
              </div>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Mot de utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Role"
                    type='text'
                    disabled
                    value={role.title || ''} // Display role title for user clarity
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  {(user.role.title === 'Demandeur' || user.role.title === 'D.Site') && <TextField
                    required
                    id="outlined-required"
                    label="Site"
                    type='text'
                    disabled
                    value={site}
                    onChange={(e) => setSite(e.target.value)}
                  />}
                </Grid>

              </Grid>
            </div>
            <div className='text-center m-4 w-full'>
              <Button variant="contained" endIcon={<CreateOutlinedIcon />} onClick={handleUpdateProfile}>
                Mettre à jour le profil
              </Button>
              <SnackNar open={open} setOpen={setOpen} text={'profil mis à jour avec succès'} color={'success'} />

            </div>
          </Box>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Profile;
