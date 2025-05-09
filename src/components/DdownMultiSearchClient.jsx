import { useEffect, useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import repositoryClientsInstance from "../repositorys/clientRepository";

const DdownMultiSearchClient = ({
  onChange,
  multiple = true,
  defaultValue = null,
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState(multiple ? [] : null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await repositoryClientsInstance.getClients();
        const dropdownOptions = response.map((client) => ({
          id: client.Id_Cliente,
          label: client.Nombres,
          value: client.Id_Cliente,
        }));
        setOptions(dropdownOptions);

        if (defaultValue !== null) {
          const initial = multiple
            ? dropdownOptions.filter((opt) => defaultValue.includes(opt.value))
            : dropdownOptions.find((opt) => opt.value === defaultValue) || null;
          setSelectedOptions(initial);
          if (initial) {
            onChange(
              multiple ? initial.map((opt) => opt.value) : initial.value
            );
          }
        }
      } catch (e) {
        console.error("Error loading clients:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [defaultValue, multiple]);

  return (
    <Autocomplete
      multiple={multiple}
      options={options}
      getOptionLabel={(opt) => opt.label}
      isOptionEqualToValue={(opt, val) => opt.value === val.value}
      value={selectedOptions}
      loading={loading}
      onChange={(_, newValue) => {
        setSelectedOptions(newValue);
        const result = multiple
          ? newValue.map((opt) => opt.value)
          : newValue?.value || null;
        onChange(result);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={loading ? "Cargando..." : "Seleccione Cliente(s)"}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          fullWidth
        />
      )}
      // renderTags={(tagValue, getTagProps) =>
      //   tagValue.map((opt, idx) => {
      //     const { key, ...tagPropsWithoutKey } = getTagProps({ index: idx });
      //     return (
      //       <Chip key={opt.value} label={opt.label} {...tagPropsWithoutKey} />
      //     );
      //   })
      // }
      sx={{ minWidth: 200 }}
    />
  );
};

export default DdownMultiSearchClient;
