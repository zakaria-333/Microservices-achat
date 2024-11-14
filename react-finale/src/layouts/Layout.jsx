import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Navigate, Outlet, useNavigate, useNavigation } from 'react-router-dom';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import { getDesignTokens } from '../Theme';
import { useContext } from 'react';
import AuthContext from '../authRouter/AuthContext';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Layout = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const [mode, setMode] = React.useState(
    localStorage.getItem("currentMode") || 'light'
  );
  
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <TopBar open={open} handleDrawerOpen={handleDrawerOpen} setMode={setMode} />
        <SideBar open={open} handleDrawerClose={handleDrawerClose} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Layout;
