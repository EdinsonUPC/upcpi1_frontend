import { useEffect, useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import repositoryParametroInstance from "../repositorys/parametrosRepository";

const DdownSearchParametro = ({
  selectedValue,
  defaultValue = null,
  onChange,
  placeholder = "Seleccione...",
  name,
  idParametro,
  filtroParametroDetallePadre = null,
  defaultOption = null,
}) => {
  const [allParams, setAllParams] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(null);

  // Load all parameters once
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await repositoryParametroInstance.getParametro();
        setAllParams(data);
        // Build initial options for this idParametro
        let opts = data
          .filter((p) => p.Id_Parametro === idParametro)
          .map((p) => ({
            key: p.Id_Item,
            label: p.Texto,
            value: p.Valor,
          }));
        if (defaultOption) opts.unshift(defaultOption);
        setOptions(opts);
      } catch (err) {
        console.error("Error loading parametros:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [idParametro, defaultOption]);

  // Re-filter when filtroParametroDetallePadre changes
  useEffect(() => {
    if (!filtroParametroDetallePadre) return;
    const parent = allParams.find(
      (p) => p.Valor === filtroParametroDetallePadre
    );
    let opts = allParams
      .filter((p) => p.Id_Parametro === idParametro)
      .filter((p) => p.IdParametroDetallePadre === parent?.Id_Item)
      .map((p) => ({ key: p.Id_Item, label: p.Texto, value: p.Valor }));
    if (defaultOption) opts.unshift(defaultOption);
    setOptions(opts);
  }, [filtroParametroDetallePadre, allParams, idParametro, defaultOption]);

  // Sync selectedValue → value object
  useEffect(() => {
    if (defaultValue == null) return;
    const match = options.find((opt) => opt.value === defaultValue) || null;
    setValue(match);
  }, [defaultValue, options]);

  console.log(options);
  return (
    <Autocomplete
      name={name}
      options={options}
      getOptionLabel={(opt) => opt.label}
      isOptionEqualToValue={(opt, val) => opt.value === val.value}
      value={value}
      onChange={(_, newVal) => {
        setValue(newVal);
        onChange({ name, value: newVal?.value ?? "" });
      }}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={placeholder}
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      sx={{ minWidth: 200 }}
    />
  );
};

export default DdownSearchParametro;
