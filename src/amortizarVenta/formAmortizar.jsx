import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Stack,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import dtoVenta from "../tableroReporte/dtoVenta.js";

const FormAmortizar = ({ sale, montoAmortizado }) => {
  const [venta, setVenta] = useState(dtoVenta());

  useEffect(() => {
    setVenta({
      ...sale,
    });
  }, [sale]);

  // const [selectedTipo, setSelectedTipo] = useState("venta");
  // const [message, setMessage] = useState(null);
  // const [alertVariant, setAlertVariant] = useState("success");

  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            Datos de la Venta: {venta.IdVenta}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Box flex={1}>
              <Typography>Monto Subtotal:</Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={venta.Monto_SubTotal}
                readOnly={true}
              />
            </Box>
            <Box flex={1}>
              <Typography>Monto Igv:</Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={venta.Monto_Igv}
                readOnly={true}
              />
            </Box>
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Box flex={1}>
              <Typography>Monto Total:</Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={venta.Monto_Total}
                readOnly={true}
              />
            </Box>
            <Box flex={1}>
              <Typography>Monto Amortizado:</Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={montoAmortizado}
                readOnly={true}
              />
            </Box>
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Box flex={1}>
              <Typography>Monto Restante:</Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={venta.Monto_Total - montoAmortizado}
                readOnly={true}
              />
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default FormAmortizar;
