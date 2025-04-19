import { useEffect, useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

import { getPersonal } from "../repositorys/personalreposiroty";

const DdownMultiSearchPersonal = ({
  onChange,
  multiple = true,
  defaultValue = null,
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState(multiple ? [] : null);

  useEffect(() => {
    const loadPersonalOptions = async () => {
      try {
        setLoading(true);

        const personalData = await getPersonal();

        const dropdownOptions = personalData.map((person) => ({
          key: person.Id_Personal.toString(),
          text: person.Nombre,
          value: person.Id_Personal,
        }));

        setOptions(dropdownOptions);

        // Configurar el valor predeterminado si está disponible
        if (defaultValue !== null) {
          const initialSelected = multiple
            ? dropdownOptions.filter((option) =>
                defaultValue.includes(option.value)
              )
            : dropdownOptions.find((option) => option.value === defaultValue);

          setSelectedOptions(initialSelected || (multiple ? [] : null));
          if (initialSelected) {
            if (multiple) {
              onChange(initialSelected.map((option) => option.value));
            } else {
              onChange(initialSelected.value);
            }
          }
        }
      } catch (error) {
        console.error("Error al cargar los datos del personal:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPersonalOptions();
  }, [defaultValue, multiple]);

  return (
    <Autocomplete
      multiple={multiple}
      options={options}
      getOptionLabel={(option) => option.text || ""}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      value={selectedOptions}
      loading={loading}
      onChange={(_, newValue) => {
        setSelectedOptions(newValue);
        if (multiple) {
          onChange(newValue.map((option) => option.value));
        } else {
          onChange(newValue?.value);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={loading ? "Cargando..." : "Seleccione personal"}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          style={{ minWidth: "200px" }}
        />
      )}
    />
  );
};

export default DdownMultiSearchPersonal;
