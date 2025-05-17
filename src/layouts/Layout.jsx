import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);

  const handleMenuOpen = (event, menuNumber) => {
    if (menuNumber === 1) setAnchorEl1(event.currentTarget);
    if (menuNumber === 2) setAnchorEl2(event.currentTarget);
    if (menuNumber === 3) setAnchorEl3(event.currentTarget);
  };

  const handleNavigate = (url) => {
    navigate(url);
  };
  const handleMenuClose = (menuNumber, url) => {
    handleNavigate(url);
    if (menuNumber === 1) setAnchorEl1(null);
    if (menuNumber === 2) setAnchorEl2(null);
    if (menuNumber === 3) setAnchorEl3(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          {/* Título primero */}
          <Typography variant="h6" sx={{ marginRight: 2 }}>
            Mi Aplicación
          </Typography>

          {/* Menús después del título */}
          <Button color="inherit" onClick={(e) => handleMenuOpen(e, 1)}>
            Inicio
          </Button>
          <Menu
            anchorEl={anchorEl1}
            open={Boolean(anchorEl1)}
            onClose={() => handleMenuClose(1)}
          >
            <MenuItem onClick={() => handleMenuClose(1, "dashboard")}>
              dashboard
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(1, "products")}>
              Listado de productos
            </MenuItem>
            {/* <MenuItem onClick={() => handleMenuClose(1)}>Submenú 1-3</MenuItem> */}
          </Menu>

          <Button color="inherit" onClick={(e) => handleMenuOpen(e, 2)}>
            Ventas
          </Button>
          <Menu
            anchorEl={anchorEl2}
            open={Boolean(anchorEl2)}
            onClose={() => handleMenuClose(2)}
          >
            <MenuItem
              onClick={() => handleMenuClose(2, "ventas/tablero-reporte")}
            >
              Tablero Básico
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuClose(2, "ventas/mantenimiento")}
            >
              Mantenimiento
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(2)}>Submenú 2-3</MenuItem>
          </Menu>

          {/* <Button color="inherit" onClick={(e) => handleMenuOpen(e, 3)}>
            Menú 3
          </Button>
          <Menu
            anchorEl={anchorEl3}
            open={Boolean(anchorEl3)}
            onClose={() => handleMenuClose(3)}
          >
            <MenuItem onClick={() => handleMenuClose(3)}>Submenú 3-1</MenuItem>
            <MenuItem onClick={() => handleMenuClose(3)}>Submenú 3-2</MenuItem>
            <MenuItem onClick={() => handleMenuClose(3)}>Submenú 3-3</MenuItem>
          </Menu> */}

          {/* Espacio flexible para empujar logout a la derecha */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Botón de logout a la derecha */}
          <Button color="inherit" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>

      {/* Aquí se renderizan las páginas hijas */}
      <Box sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
