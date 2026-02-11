import Box from '@mui/material/Box';
import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
      <LoginForm />
    </Box>
  );
}
