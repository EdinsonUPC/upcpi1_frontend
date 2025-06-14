import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import repositoryParametroInstance from "../repositorys/parametrosRepository";

const DdownSearchParametro = forwardRef(
  (
    {
      onChange,
      placeholder = "Seleccione...",
      name,
      idParametro,
      filtroParametroDetallePadre = null,
      // defaultOption = null,
    },
    ref
  ) => {
    const [allParams, setAllParams] = useState([]);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(null);

    useImperativeHandle(ref, () => ({
      reset: () => setValue(null),
      getValue: () => value,
      setOption: (x) => {
        console.log("xxxxxxxxxxxxxxxxxxxxxx");
        console.log(x);
        setValue(options.find((option) => option.value === x));
      },
      reloadOptions: async () => {
        setLoading(true);
        try {
          const data = await repositoryParametroInstance.getParametro();
          setAllParams(data);
          let opts = data
            .filter((p) => p.Id_Parametro === idParametro)
            .map((p) => ({
              key: p.Id_Item,
              label: p.Texto,
              value: p.Valor,
            }));
          // if (defaultOption) opts.unshift(defaultOption);
          setOptions(opts);
        } catch (err) {
          console.error("Error reloading parametros:", err);
        } finally {
          setLoading(false);
        }
      },
    }));

    console.log("options!!!!!!");
    console.log(options);
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
          // if (defaultOption) opts.unshift(defaultOption);
          setOptions(opts);
        } catch (err) {
          console.error("Error loading parametros:", err);
        } finally {
          setLoading(false);
        }
      })();
      // }, [idParametro, defaultOption]);
    }, [idParametro]);

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
      // if (defaultOption) opts.unshift(defaultOption);
      setOptions(opts);
      // }, [filtroParametroDetallePadre, allParams, idParametro, defaultOption]);
    }, [filtroParametroDetallePadre, allParams, idParametro]);

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
  }
);
DdownSearchParametro.displayName = "DdownSearchParametro";

export default DdownSearchParametro;
