import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Fab, MenuItem, TextField } from "@mui/material";
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import AuthContext from '../../authRouter/AuthContext';
import axios from 'axios';

const PopUpValider = ({ demande, etat, cat,fetch }) => {
    const [open, setOpen] = React.useState(false);
    const [fournisseur, setFournisseur] = React.useState([]);
    const [fournisseurId, setFournisseurId] = React.useState('');
    const [montants, setMontants] = React.useState([]);
    const [totalMontant, setTotalMontant] = React.useState(0);

    const { token } = React.useContext(AuthContext);
    const subcategoryNames = demande.details.map(detail => detail.subCategorie.nom);

    const handleClickOpen = () => {
        setOpen(true);
        console.log(cat);
        console.log(demande);
    };

    const fetchDataFiliale = async (fournisseur) => {
        try {
            const response = await axios.post('/api/demande/fournisseur/ByCat',
                fournisseur,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
            const transformedData = response.data.map((item) => ({
                id: item.id,
                label: item.nom,
            }));
    
            setFournisseur(transformedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fournisseurObject = {
        id: cat
        // other properties if needed
    };

    React.useEffect(() => {
        fetchDataFiliale(fournisseurObject);
    }, []);

    const handleMontantChange = (index, value) => {
        const newMontants = [...montants];
        newMontants[index] = parseFloat(value) || 0;
        setMontants(newMontants);

        // Calculate the total montant
        const total = newMontants.reduce((acc, curr) => acc + curr, 0);
        setTotalMontant(total);
    };

    const valider = async (e) => {
        e.preventDefault();

        // Constructing the DetailWrapper object
        const detailWrapper = {
            demande: demande,
            montants: montants,
            fournisseur: { id: fournisseurId } // Assuming only the id is needed
        };

        try {
            // Calling the affecterMontant API
            const response = await axios.post('/api/demande/affecterMontant', detailWrapper, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data) {
                // Handle successful validation (e.g., show a success message)
                console.log('Montants successfully assigned');
                fetch();
            } else {
                // Handle error in validation
                console.log('Failed to assign montants');
            }
        } catch (error) {
            console.error('Error validating montants:', error);
        }

        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            {etat !== 'valid' && etat !== 'refusé' && (
                <Fab onClick={handleClickOpen} color="success" aria-label="validate" size="small">
                    <DoneOutlineOutlinedIcon />
                </Fab>
            )}

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: valider
                }}
            >
                <DialogTitle sx={{ textAlign: 'center', fontSize: '22px' }}>
                    Ajouter les montants des subCategories
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '29ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        {subcategoryNames.map((name, index) => (
                            <div key={index}>
                                <TextField
                                    sx={{ fontWeight: 'bold', color: 'black', fontsize: '60px' }}
                                    id={`outlined-required-code-${index}`}
                                    value={name}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    required
                                    id={`outlined-required-montant-${index}`}
                                    label={'Montant'}
                                    value={montants[index] || ''}
                                    onChange={(e) => handleMontantChange(index, e.target.value)}
                                />
                            </div>
                        ))}

                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Fournisseur"
                            value={fournisseurId}
                            onChange={(e) => setFournisseurId(e.target.value)}
                        >
                            {fournisseur.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            required
                            id="outlined-required-total"
                            label="Montant Total"
                            value={totalMontant}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button type="submit">Confirmer</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default PopUpValider;
