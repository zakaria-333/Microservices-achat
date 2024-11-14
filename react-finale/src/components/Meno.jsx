import * as React from 'react';
import Button from '@mui/material/Button';

import MenuItem from '@mui/material/MenuItem';
import { Divider, IconButton, Menu } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useNavigate } from 'react-router-dom';

export default function Meno() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose1 = () => {
        navigate('/profil');
        setAnchorEl(null);
    }; const handleClose2 = () => {
        navigate('/logout');

        setAnchorEl(null);
    };
    const handleClose = () => {

        setAnchorEl(null);
    };

    return (
        <div>

            <IconButton color='inherit' onClick={handleClick}>
                <SettingsOutlinedIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose1}>Profil</MenuItem>
                <Divider />
                <MenuItem onClick={handleClose2}>Déconnexion</MenuItem>
            </Menu>
        </div>
    );
}
