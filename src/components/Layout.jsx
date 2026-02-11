import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography
            component={RouterLink}
            to="/"
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 700, textDecoration: 'none', color: 'inherit' }}
          >
            Bookmarks
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {user && (
              <>
                <Link component={RouterLink} to="/" color="inherit" underline="hover" sx={{ mr: 1 }}>
                  Dashboard
                </Link>
                <Typography variant="body2" sx={{ opacity: 0.9, mr: 1 }}>
                  {user.email || 'User'}
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                  Log out
                </Button>
              </>
            )}
            {!user && (
              <>
                <Button color="inherit" component={RouterLink} to="/login">
                  Log in
                </Button>
                <Button color="inherit" component={RouterLink} to="/register">
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flex: 1, p: 2, maxWidth: 720, mx: 'auto', width: '100%' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
