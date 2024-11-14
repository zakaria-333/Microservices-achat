import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Fab, useTheme } from "@mui/material";
import DeleteIcon from '@mui/icons-material/BorderColorOutlined';

import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import AuthContext from '../../authRouter/AuthContext';

import axios from 'axios';

const AlertValider = ({ text1, text2, onSuccess,etat }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const valider=()=>{
        onSuccess();
        handleClose();
        
        
    }

    const handleClose = () => {
        setOpen(false);
    };
    const theme = useTheme();

    const { token } = React.useContext(AuthContext);


    return (
        <React.Fragment>



            {etat !== 'validé' && etat !== 'refusé' && <Fab onClick={handleClickOpen} color="success" aria-label="validate" size="small">
                
                <DoneOutlineOutlinedIcon />
            </Fab>}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogTitle id="alert-dialog-title">
                    {/* "Are you sure you want to delete this user? */}
                    {text1}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {/* After clicking on 'Agree,' this user will be permanently deleted and cannot be recovered. */}
                        {text2}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={valider} autoFocus>
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default AlertValider
