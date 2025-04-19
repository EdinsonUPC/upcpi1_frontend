import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import dtoLineaVenta from "./dtoLineaVenta";
import DetalleTara from "./DetalleTara";

const UNIDADES_POR_JAVA = 8;

const DetalleTransaccion = ({ onUpdate, lineasIniciales = [] }) => {
  const [lineas, setLineas] = useState(lineasIniciales);

  useEffect(() => {
    if (lineasIniciales.length > 0) {
      setLineas(lineasIniciales);
    }
  }, [lineasIniciales]);

  const handleInputChange = (index, field, value) => {
    const updated = lineas.map((ln, i) => {
      if (i !== index) return ln;
      const newLn = { ...ln };
      if (field === "EsDevolucion") {
        newLn.EsDevolucion = value ? "S" : "N";
      } else if (field === "EsPesoTaraEditado" || field === "FlagJava") {
        newLn[field] = value;
      } else {
        const num = parseFloat(value) || 0;
        newLn[field] = num;
        if (field === "PesoBruto" || field === "PesoTara") {
          newLn.PesoNeto = newLn.PesoBruto - newLn.PesoTara;
        }
        if (field === "CantidadJavas") {
          newLn.Unidades = newLn.CantidadJavas * UNIDADES_POR_JAVA;
        }
      }
      return newLn;
    });
    setLineas(updated);
    onUpdate(updated);
  };

  const handleApplyTara = (index, totalTara, cantidadJavas, detalleOpc) => {
    const updated = lineas.map((ln, i) =>
      i === index
        ? {
            ...ln,
            PesoTara: totalTara,
            PesoNeto: ln.PesoBruto - totalTara,
            CantidadJavas: cantidadJavas,
            Unidades: cantidadJavas * UNIDADES_POR_JAVA,
            detalleTaraOpciones: detalleOpc,
          }
        : ln
    );
    setLineas(updated);
    onUpdate(updated);
  };

  const handleAddLinea = () => {
    const nueva = dtoLineaVenta();
    const updated = [...lineas, nueva];
    setLineas(updated);
    onUpdate(updated);
  };

  const handleDeleteLinea = (index) => {
    if (window.confirm("¿Eliminar esta línea?")) {
      const updated = lineas.filter((_, i) => i !== index);
      setLineas(updated);
      onUpdate(updated);
    }
  };

  return (
    <Box>
      {/* Header for md+ */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ display: { xs: "none", md: "flex" }, fontWeight: "bold", mb: 1 }}
      >
        {[
          "Dev.",
          "P.Bruto",
          "P.Tara",
          "P.Neto",
          "Cant. Jabas",
          "Unid.",
          "",
        ].map((h) => (
          <Box flex={1} key={h}>
            <Typography align="center">{h}</Typography>
          </Box>
        ))}
      </Stack>

      {lineas.map((ln, idx) => (
        <Stack key={idx} direction="row" spacing={2} alignItems="center" mb={1}>
          {/* Devolución */}
          <Box flex={1} display="flex" alignItems="center">
            <FormControlLabel
              sx={{ display: { xs: "flex", md: "none" } }}
              label="Dev."
              control={<Box component="span" />}
            />
            <Checkbox
              checked={ln.EsDevolucion === "S"}
              onChange={(e) =>
                handleInputChange(idx, "EsDevolucion", e.target.checked)
              }
            />
          </Box>

          {/* Peso Bruto */}
          <Box flex={1}>
            <Typography
              variant="caption"
              sx={{ display: { xs: "block", md: "none" } }}
            >
              P.Bruto
            </Typography>
            <TextField
              fullWidth
              size="small"
              type="number"
              value={ln.PesoBruto}
              onChange={(e) =>
                handleInputChange(idx, "PesoBruto", e.target.value)
              }
            />
          </Box>

          {/* Peso Tara + DetalleTara */}
          <Box flex={1} display="flex" alignItems="center">
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="caption"
                sx={{ display: { xs: "block", md: "none" } }}
              >
                P.Tara
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="number"
                value={ln.PesoTara}
                onChange={(e) =>
                  handleInputChange(idx, "PesoTara", e.target.value)
                }
              />
            </Box>
            <DetalleTara
              onApply={(t, cj, opts) => handleApplyTara(idx, t, cj, opts)}
              detalleTaraOpciones={ln.detalleTaraOpciones}
            />
          </Box>

          {/* Peso Neto */}
          <Box flex={1}>
            <Typography
              variant="caption"
              sx={{ display: { xs: "block", md: "none" } }}
            >
              P.Neto
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={ln.PesoNeto}
              InputProps={{ readOnly: true }}
            />
          </Box>

          {/* Cantidad Jabas */}
          <Box flex={1}>
            <Typography
              variant="caption"
              sx={{ display: { xs: "block", md: "none" } }}
            >
              Cant.Jabas
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={ln.CantidadJavas}
              InputProps={{ readOnly: true }}
            />
          </Box>

          {/* Unidades */}
          <Box flex={1}>
            <Typography
              variant="caption"
              sx={{ display: { xs: "block", md: "none" } }}
            >
              Unid.
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={ln.Unidades}
              InputProps={{ readOnly: true }}
            />
          </Box>

          {/* Delete */}
          <Box>
            <IconButton color="error" onClick={() => handleDeleteLinea(idx)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Stack>
      ))}

      {/* Add line */}
      <Box textAlign="right" mt={2}>
        <Button variant="contained" onClick={handleAddLinea}>
          Agregar Línea
        </Button>
      </Box>
    </Box>
  );
};

export default DetalleTransaccion;
