import { useState } from "react";
import {
  IconButton,
  Popover,
  Box,
  Stack,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import ScaleIcon from "@mui/icons-material/Scale";

const DetalleTaraEdit = ({ onApply, detalleTaraOpciones = [] }) => {
  const [taraOptions, setTaraOptions] = useState(
    detalleTaraOpciones?.length
      ? detalleTaraOpciones
      : [{ tipoTara: 6.8, cantidad: 1, tara: 6.8 }]
  );
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "detalle-tara-popover" : undefined;

  const handleToggle = (evt) => setAnchorEl(open ? null : evt.currentTarget);

  const handleAdd = () =>
    setTaraOptions([...taraOptions, { tipoTara: 6.8, cantidad: 1, tara: 6.8 }]);

  const handleChange = (i, field, value) =>
    setTaraOptions((prev) =>
      prev.map((opt, idx) =>
        idx === i
          ? {
              ...opt,
              [field]:
                field === "tipoTara" ? value : parseFloat(value) || opt[field],
            }
          : opt
      )
    );

  const handleApply = () => {
    const totalTara = taraOptions.reduce(
      (sum, o) => sum + o.cantidad * o.tara,
      0
    );
    const cantidadJavas = taraOptions.reduce((sum, o) => sum + o.cantidad, 0);
    onApply(totalTara, cantidadJavas, taraOptions);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-describedby={id}
        color="secondary"
        onClick={handleToggle}
      >
        <ScaleIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <Stack spacing={2}>
            {taraOptions.map((opt, i) => (
              <Stack direction="row" spacing={1} key={i} alignItems="center">
                <Select
                  value={opt.tipoTara}
                  onChange={(e) =>
                    handleChange(i, "tipoTara", parseFloat(e.target.value))
                  }
                  size="small"
                  sx={{ flex: 1 }}
                >
                  <MenuItem value={6.8}>Por defecto</MenuItem>
                  <MenuItem value={6.2}>Galleta</MenuItem>
                  <MenuItem value={7}>Tara2</MenuItem>
                </Select>

                <TextField
                  type="number"
                  size="small"
                  label="Cant."
                  value={opt.cantidad}
                  onChange={(e) => handleChange(i, "cantidad", e.target.value)}
                  sx={{ width: 80 }}
                />

                <TextField
                  type="number"
                  size="small"
                  label="Tara"
                  value={opt.tara}
                  onChange={(e) => handleChange(i, "tara", e.target.value)}
                  sx={{ width: 80 }}
                />
              </Stack>
            ))}

            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button size="small" onClick={handleAdd}>
                Agregar
              </Button>
              <Button variant="contained" size="small" onClick={handleApply}>
                Aplicar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Popover>
    </>
  );
};

export default DetalleTaraEdit;
