import { Autocomplete, TextField } from "@mui/material";

const DdownMultiSearchEstados = ({ onChange, multiple = true }) => {
  const options = [
    { id: "CAN", label: "Cancelado" },
    { id: "REG", label: "Registrado" },
    { id: "ANL", label: "Anulado" },
  ];

  return (
    <Autocomplete
      multiple={multiple}
      options={options}
      getOptionLabel={(option) => option.label}
      onChange={(event, value) => {
        if (multiple) {
          onChange(value.map((v) => v.id));
        } else if (value) {
          onChange(value.id);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Seleccione Estado(s)"
          placeholder="Buscar estado"
          size="small"
        />
      )}
      sx={{ minWidth: 200 }}
    />
  );
};

export default DdownMultiSearchEstados;
