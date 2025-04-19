import { Container, Box, Tabs, Tab } from "@mui/material";
// import FormTableroElectronico from "./FormTableroElectronico";

// import FormHistorialTableroElectronico from "./FormHistorialTableroElectronico";
import { useState } from "react";
import FormTableroElectronico from "../tableroReporte/FormTableroElectronico";

function TableroReporte() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Tabs tablero electrónico"
        >
          <Tab label="Tablero Electrónico" />
          <Tab label="Historial" />
        </Tabs>
      </Box>

      <Box sx={{ mt: 2 }}>
        {value === 0 && <FormTableroElectronico />}
        {/* {value === 1 && <FormHistorialTableroElectronico />} */}
      </Box>
    </Container>
  );
}

export default TableroReporte;
