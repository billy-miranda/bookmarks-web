import Box from '@mui/material/Box';
import RegisterForm from '../components/RegisterForm';

export default function Register() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
      <RegisterForm />
    </Box>
  );
}
