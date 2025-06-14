import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Stack,
  CssBaseline,
} from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SideMenu from "./components/SideMenu";
import { alpha } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "../dashboard/theme/customizations";

const Layout = (props) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // const [anchorEl1, setAnchorEl1] = useState(null);
  // const [anchorEl2, setAnchorEl2] = useState(null);
  // const [anchorEl3, setAnchorEl3] = useState(null);

  // const handleMenuOpen = (event, menuNumber) => {
  //   if (menuNumber === 1) setAnchorEl1(event.currentTarget);
  //   if (menuNumber === 2) setAnchorEl2(event.currentTarget);
  //   if (menuNumber === 3) setAnchorEl3(event.currentTarget);
  // };

  // const handleNavigate = (url) => {
  //   navigate(url);
  // };
  // const handleMenuClose = (menuNumber, url) => {
  //   handleNavigate(url);
  //   if (menuNumber === 1) setAnchorEl1(null);
  //   if (menuNumber === 2) setAnchorEl2(null);
  //   if (menuNumber === 3) setAnchorEl3(null);
  // };

  // const handleLogout = () => {
  //   logout();
  //   navigate("/", { replace: true });
  // };

  const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
  };
  return (
    // <AppTheme {...props} themeComponents={xThemeComponents}>
    //   <CssBaseline enableColorScheme />
    <>
      <Box sx={{ display: "flex" }}>
        {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ marginRight: 2 }}>
            Mi Aplicación
          </Typography>

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

       

          <Box sx={{ flexGrow: 1 }} />

          <Button color="inherit" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar> */}
        <SideMenu />
        {/* Aquí se renderizan las páginas hijas */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Outlet />
        </Box>
      </Box>
    </>
    // </AppTheme>
  );
};

export default Layout;
