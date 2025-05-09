import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes llamar a tu API de autenticación
    const { auth, message } = await login(username, password, company);
    if (auth) {
      navigate("/dashboard", { replace: true });
    } else {
      setError(message || "Credenciales inválidas");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" align="center">
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="company-label">Selecciona tu empresa</InputLabel>
            <Select
              labelId="company-label"
              value={company}
              label="Selecciona tu empresa"
              onChange={(e) => setCompany(e.target.value)}
            >
              <MenuItem value="CITAVAL">CITAVAL</MenuItem>
              <MenuItem value="TRANSAVIC">TRANSAVIC</MenuItem>
              <MenuItem value="TestDVGP">TEST</MenuItem>
            </Select>
          </FormControl>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
