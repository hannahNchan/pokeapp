import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Container } from '@mui/material';
import Alert from '@mui/material/Alert';
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
    password: ''
  });
  const [wrong, setWrong] = useState(false);

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
    const response = await fetch('/login.json');
    const responseSolved = await response.json();

    const isCorrect =
      formData.admin === responseSolved.admin && formData.password === responseSolved.password;

    const validateResponse = isCorrect
      ? { message: 'Inicio de sesión exitoso.', status: 'ok' }
      : { message: 'Credenciales incorrectas.', status: 'failed' };

    if (validateResponse.status === 'ok') {
      setWrong(false);
      await login({ username: formData.user });
    } else {
      setWrong(true);
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

          {wrong && <Alert severity="error">Invalid username or password</Alert>}

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
