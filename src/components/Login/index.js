import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Paper,
  Container
} from '@mui/material';
import { styled } from '@mui/system';

import { ReactComponent as Logo } from '../../assets/pokemon_logo.svg';
import { useAuth } from '../../hooks/useAuth';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  margin: 'auto',
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius
}));

const CenteredContainer = styled(Container)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
}));

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    user: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    //dispatch(service.loginPost(formData));
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...formData })
    });
    const responseSolved = await response.json();

    if (responseSolved.status === 'ok') {
      await login({ username: formData.user });
    } else {
      console.log('Invalid username or password');
    }
  };

  const isFormValid = formData.user.trim() !== '' && formData.password.trim() !== '';

  return (
    <CenteredContainer maxWidth="sm">
      <StyledPaper elevation={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Logo width="300px" height="130px" />
        </Box>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Iniciar sesión
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Bienvenido a la pagina de Pokemons
        </Typography>

        <Box component="form" onSubmit={handleLogin} noValidate>
          <TextField
            label="User ID"
            name="user"
            type="user"
            value={formData.user}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <FormControlLabel
            control={
              <Checkbox
                disabled
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
            }
            label="Recordarme"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!isFormValid}>
            Sign In
          </Button>
        </Box>
      </StyledPaper>
    </CenteredContainer>
  );
};

export default Login;
