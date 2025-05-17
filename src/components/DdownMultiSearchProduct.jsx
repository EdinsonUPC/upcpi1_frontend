import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import repositoryProductsInstance from "../repositorys/productsRepository";

const DdownMultiSearchProduct = forwardRef(
  ({ onChange, multiple = true }, ref) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedValue, setSelectedValue] = useState(multiple ? [] : null);

    useImperativeHandle(ref, () => ({
      reset: () => setSelectedValue(null),
      getValue: () => selectedValue,
      setValue: (x) => setSelectedValue(x),
    }));

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const response = await repositoryProductsInstance.getProducts();

          const stateOptions = response.map((product) => ({
            key: product.id_producto,
            label: product.nombre,
            value: product.id_producto,
          }));

          setOptions(stateOptions);
        } catch (error) {
          console.error("Error al cargar los productos:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }, []);

    return (
      <Autocomplete
        multiple={multiple}
        options={options}
        getOptionLabel={(option) => option.label || ""}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        value={
          multiple
            ? options.filter((option) => selectedValue.includes(option.value))
            : options.find((option) => option.value === selectedValue) || null
        }
        loading={loading}
        onChange={(_, newValue) => {
          const value = multiple
            ? newValue.map((option) => option.value)
            : newValue?.value || null;
          setSelectedValue(value);
          onChange(value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={loading ? "Cargando..." : "Seleccione Producto(s)"}
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
            style={{ minWidth: "200px" }}
          />
        )}
      />
    );
  }
);

DdownMultiSearchProduct.displayName = "DdownMultiSearchProduct";

export default DdownMultiSearchProduct;
