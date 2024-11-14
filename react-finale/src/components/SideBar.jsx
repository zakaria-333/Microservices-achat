import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Avatar, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import AuthContext from '../authRouter/AuthContext';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import { useContext } from 'react';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddHomeWorkOutlinedIcon from '@mui/icons-material/AddHomeWorkOutlined';
import CarRepairOutlinedIcon from '@mui/icons-material/CarRepairOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PhonelinkOutlinedIcon from '@mui/icons-material/PhonelinkOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import RuleFolderOutlinedIcon from '@mui/icons-material/RuleFolderOutlined';

const drawerWidth = 240;


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    // @ts-ignore
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);





const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));



const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});


const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});


const array1 = [
    {
        "text": "Accueil",
        "icon": <HomeOutlinedIcon />,
        "path": "/"
    },
]

const array2 = [
    {
        "text": "Demande",
        "icon": <CreateNewFolderOutlinedIcon />,
        "path": "/demandeur/demande",
        "allowedRoles": ["ROLE_DEMANDEUR"]
    },
    {
        "text": "Utilisateurs",
        "icon": <AccountCircleOutlinedIcon />,
        "path": "/admin/user",
        "allowedRoles": ["ROLE_ADMIN"]
    },
    {
        "text": "Sites",
        "icon": <AddHomeWorkOutlinedIcon />,
        "path": "/admin/site",
        "allowedRoles": ["ROLE_ADMIN"]
    },
    {
        "text": "Filiales",
        "icon": <CarRepairOutlinedIcon />,
        "path": "/admin/filiale",
        "allowedRoles": ["ROLE_ADMIN"]
    },
    {
        "text": "Categories",
        "icon": <CategoryOutlinedIcon />,
        "path": "/achat/categorie",
        "allowedRoles": ["ROLE_ACHAT"]
    },
    {
        "text": "Sous Categories",
        "icon": <PhonelinkOutlinedIcon />,
        "path": "/achat/sub-category",
        "allowedRoles": ["ROLE_ACHAT"]
    },
    {
        "text": "Fournisseurs",
        "icon": <AddShoppingCartOutlinedIcon />,
        "path": "/achat/fournisseur",
        "allowedRoles": ["ROLE_ACHAT"]
    },
    {
        "text": "Demandes",
        "icon": <RuleFolderOutlinedIcon />,
        "path": "/ds/demandes",
        "allowedRoles": ["ROLE_DS"]
    },
    {
        "text": "Demandes",
        "icon": <RuleFolderOutlinedIcon />,
        "path": "/achat/demandeAchat",
        "allowedRoles": ["ROLE_ACHAT"]
    },
    {
        "text": "Ajustement du Budget",
        "icon": <CurrencyExchangeOutlinedIcon />,
        "path": "/daf/budget-ajustement",
        "allowedRoles": ["ROLE_DAF"]
    },
    {
        "text": "Historique",
        "icon": <WorkHistoryOutlinedIcon />,
        "path": "/daf/historique-ajustement",
        "allowedRoles": ["ROLE_DAF"]
    },
    {
        "text": "Demandes",
        "icon": <RuleFolderOutlinedIcon />,
        "path": "/daf/demandes",
        "allowedRoles": ["ROLE_DAF"]
    },
    {
        "text": "Demandes",
        "icon": <RuleFolderOutlinedIcon />,
        "path": "/dg/demandes",
        "allowedRoles": ["ROLE_DG"]
    },
];

const array3 = [
    {
        "text": "Profil",
        "icon": <AccountBoxOutlinedIcon />,
        "path": "/profil"
    },
    {
        "text": "Déconnexion",
        "icon": <LogoutOutlinedIcon />,
        "path": "/logout"
    }
]




export default function SideBar({ open, handleDrawerClose }) {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const base64Image = `data:image/jpeg;base64,${user.photo}`

    // Check if user is null or undefined
    if (!user || !user.role) {
        return null; // or a loading spinner, or any fallback UI
    }

    const allowed = array2.filter(stat =>
        stat.allowedRoles.includes(user.role.nom)
    );

    return (
        <Drawer variant="permanent" open={open}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <Avatar sx={{ mx: "auto", transition: "0.3s", width: open ? 90 : 45, height: open ? 90 : 45, border: "2px solid grey", my: 1 }} alt="Profile" src={base64Image}/>
                    <Typography align='center' sx={{ fontSize: open ? 18 : 0, fontWeight: 10, fontFamily: 'initial', transition: "0.3s" }}>{user.nom} {user.prenom}</Typography>
                    <Typography align='center' sx={{ fontSize: open ? 16 : 0, my: 1, transition: "0.3s", color: theme.palette.info.main}} >{user.role.title}</Typography>
                    <Divider />
                    <List>
                        {array1.map((item) => (
                            <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton onClick={() => navigate(item.path)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        bgcolor: location.pathname == item.path ? (theme.palette.mode == 'dark' ? grey[900] : grey[300]) : null
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Tooltip placement="right-start" title={item.text} disableInteractive>
                                            {item.icon}
                                        </Tooltip>
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {allowed.map((item) => (
                            <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton onClick={() => navigate(item.path)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        bgcolor: location.pathname == item.path ? (theme.palette.mode == 'dark' ? grey[900] : grey[300]) : null
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Tooltip placement="right-start" title={item.text} disableInteractive>
                                            {item.icon}
                                        </Tooltip>
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </div>
                <div style={{ marginTop: 'auto' }}>
                    <List>
                        {array3.map((item) => (
                            <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton onClick={() => navigate(item.path)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        bgcolor: location.pathname == item.path ? (theme.palette.mode == 'dark' ? grey[900] : grey[300]) : null
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Tooltip title={item.text} placement="right-start" disableInteractive>
                                            {item.icon}
                                        </Tooltip>
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
        </Drawer>
    );
}
