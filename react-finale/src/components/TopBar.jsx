import { Badge, Box, IconButton, Stack, Toolbar, Tooltip, Typography, useTheme } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Search from './Search';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../authRouter/AuthContext';
import Meno from './Meno';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// topbar
const drawerWidth = 240;


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
    // @ts-ignore
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));











export default function TopBar({ open, handleDrawerOpen, setMode }) {
    const theme = useTheme()
    const { user, token,demandesCountSite,fetchDemandesCd,demandesCountAchat,fetchDemandesAchat } = useContext(AuthContext);
    const navigate=useNavigate()
    
        useEffect(() => {

        if (user.role.title === 'D.Site') {
            fetchDemandesCd();
        }
        if (user.role.title === 'D.Achat') {
            fetchDemandesAchat();
        }
    });
    



    return (
        <AppBar position="fixed"
            // @ts-ignore
            open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Box flexGrow={1} />
                <Stack direction={'row'}>

                    {theme.palette.mode == 'light' ? <IconButton onClick={() => {

                        localStorage.setItem("currentMode", theme.palette.mode == 'light' ? 'dark' : 'light')
                        setMode((prevMode) =>
                            prevMode === 'light' ? 'dark' : 'light',
                        );
                    }} color='inherit'>
                        <LightModeOutlinedIcon />
                    </IconButton> : <IconButton onClick={() => {
                        localStorage.setItem("currentMode", theme.palette.mode == 'light' ? 'dark' : 'light')
                        setMode((prevMode) =>
                            prevMode === 'light' ? 'dark' : 'light',
                        );
                    }} color='inherit'>
                        <DarkModeOutlinedIcon />
                    </IconButton>}


                    {user.role.title == "D.Site" &&<Tooltip title={`vous avez ${demandesCountSite} demades  en cours`} >
                        <IconButton color='inherit' onClick={()=>{navigate('/ds/demandes')}}>
                        {demandesCountSite > 0 ? (
                            <Badge badgeContent={demandesCountSite} color="secondary">
                                <NotificationsNoneOutlinedIcon />
                            </Badge>
                        ) : (
                            <NotificationsNoneOutlinedIcon />
                        )}
                    </IconButton>
                    </Tooltip> }
                    {user.role.title == "D.Achat" &&<Tooltip title={`vous avez ${demandesCountAchat} demades  en cours`} >
                        <IconButton color='inherit' onClick={()=>{navigate('/acchat/demandeAchat')}}>
                        {demandesCountAchat > 0 ? (
                            <Badge badgeContent={demandesCountAchat} color="secondary">
                                <NotificationsNoneOutlinedIcon />
                            </Badge>
                        ) : (
                            <NotificationsNoneOutlinedIcon />
                        )}
                    </IconButton>
                    </Tooltip> }
                    <Meno />

                </Stack>
            </Toolbar>
        </AppBar>
    )
}
