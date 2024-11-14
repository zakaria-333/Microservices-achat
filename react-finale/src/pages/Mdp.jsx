import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from 'react-router-dom';
import { Backdrop, CircularProgress, InputAdornment, TextField } from '@mui/material';
import SnackNar from '../components/SnackNar';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// @ts-ignore
import Background from '../assets/images/background.jpg';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';

const steps = ['Entrez une adresse e-mail valide', 'Entrez le code de vérification', 'Créer un nouveau mot de passe'];

export default function Mdp() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [generatedToken, setGeneratedToken] = useState(null)
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const navigate = useNavigate();

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const generateRandomWord = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    let word = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      word += letters[randomIndex];
    }
    return word;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const sendMail = async (genToken) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-token", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: genToken, email })
      });
      const data = await res.json();
      if (data === true) {
        toast.success("Un code de verification est envoyé");
        setGeneratedToken(genToken)
      } else {
        toast.error("Échec de l'envoi du mail");
      }
    } catch (error) {
      toast.error("Erreur lors de l'envoi de l'email");
    } finally {
      setLoading(false);
    }
  };

  const click1 = async () => {
    const res = await fetch("/api/auth/email-validation", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    const verification = await res.json();
    if (verification === true) {
      const randomWord = generateRandomWord();
      handleNext();
      sendMail(randomWord);
    } else {
      setOpen(true);
    }
  };

  const click2 = () => {
    if (token == generatedToken) {
      toast.success("verifié")
      handleNext()
    } else {
      setOpen(true)
    }
  }
  const click3 = async () => {
    if (password == confirmPassword) {
      try {
        const res = await fetch("/api/auth/update-password", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })
        const response = await res.json();
        if (response == true) {
          toast.success("Votre mot de passe a été mis à jour avec succès")
          navigate('/login');
        }
        else {
          toast.error("Échec de la mise à jour du mot de passe. Veuillez réessayer")
        }
      } catch (error) {
        toast.error("Échec de la mise à jour du mot de passe. Veuillez réessayer")
      }
    } else {
      setOpen(true)
    }
  }

  return (
    <div className="flex flex-col gap-2 bg-slate-100 h-screen w-screen items-center justify-center" style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-45"></div>
      <div className="flex items-center justify-center w-3/4 h-5/6 bg-white border border-gray-300 shadow-md rounded-2xl relative z-10">
        <div>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === 0 ?
            <>
              <Box sx={{ pt: 2, m: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <TextField
                  sx={{ marginBottom: '30px', width: '600px' }}
                  required
                  label="Entrez votre email pour obtenir un code de vérification"
                  type='email'
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                />
                <Button sx={{ width: '200px', backgroundColor: '#a4cfff', color: 'black' }} onClick={click1}>
                Suivant
                </Button>
                <SnackNar open={open} setOpen={setOpen} text={"Cet email n'existe pas ou est invalide"} color={'error'} />
              </Box>
            </>
            : activeStep === 1 ?
              <>
                <Box sx={{ pt: 2, m: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <TextField
                    sx={{ marginBottom: '30px', width: '600px' }}
                    required
                    label="Entrez le code de vérification"
                    value={token}
                    onChange={(e) => { setToken(e.target.value) }}
                  />
                  <Button sx={{ width: '200px', backgroundColor: '#a4cfff', color: 'black' }} onClick={click2}>
                  Suivant
                  </Button>
                  <SnackNar open={open} setOpen={setOpen} text={"Ce code n'existe pas ou n'est pas valide"} color={'error'} />
                </Box>
              </>
              :
              <>
                <Box sx={{ pt: 2, m: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <TextField
                    sx={{ marginBottom: '30px', width: '600px' }}
                    required
                    label="Entrez un nouveau mot de passe"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                            {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                          </div>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    sx={{ marginBottom: '30px', width: '600px' }}
                    required
                    label="Confirmez le mot de passe"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                            {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                          </div>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button sx={{ width: '200px', backgroundColor: '#a4cfff', color: 'black' }} onClick={click3}>
                    Fin
                  </Button>
                  <SnackNar open={open} setOpen={setOpen} text={'Les mots de passe ne correspondent pas'} color={'error'} />
                </Box>
              </>
          }
        </div>
      </div>
      <p className="text-sm text-white z-10">
        &copy; {new Date().getFullYear()} Bugshan Automotive Group. Tous droits réservés.
      </p>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
