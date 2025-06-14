import { Container, Box, Tabs, Tab, Stack } from "@mui/material";
// import FormTableroElectronico from "./FormTableroElectronico";
// import FormHistorialTableroElectronico from "./FormHistorialTableroElectronico";
import { useState } from "react";
import FormTableroElectronico from "../tableroReporte/FormTableroElectronico";
import Header from "../components/Header";
// import VentasListadoMUI from "./mantenimientoVenta";

function TableroReporte() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: "center",
        mx: 3,
        pb: 5,
        mt: { xs: 8, md: 0 },
      }}
    >
      <Header nav={["Ventas", "Tablero Básico"]} />
      <Stack
        direction="column"
        sx={{
          // display: { xs: "none", md: "flex" },
          width: "100%",
          justifyContent: "space-between",
          maxWidth: { sm: "100%", md: "1700px" },
          pt: 1.5,
        }}
        spacing={2}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Tabs tablero Básico"
          >
            <Tab label="Tablero Básico" />
            {/* <Tab label="Historial" /> */}
          </Tabs>
        </Box>

        <Box sx={{ mt: 2 }}>
          {value === 0 && <FormTableroElectronico />}
          {/* {value === 1 && <FormHistorialTableroElectronico />} */}
        </Box>
      </Stack>
    </Stack>
  );
}

export default TableroReporte;
