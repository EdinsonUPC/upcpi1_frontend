import { useEffect, useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import repositoryProductsInstance from "../repositorys/productsRepository";

const DdownMultiSearchProduct = ({ onChange, multiple = true }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await repositoryProductsInstance.getProducts();
        const stateOptions = response.map((product) => ({
          id: product.id_producto,
          label: product.nombre,
        }));

        setOptions(stateOptions);
      } catch (error) {
        console.error("Error al cargar productos:", error);
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
      loading={loading}
      getOptionLabel={(option) => option.label}
      onChange={(event, value) => {
        console.log("Productos seleccionados:", value);
        // value puede ser array o un solo objeto dependiendo de multiple
        if (multiple) {
          onChange(value.map((v) => v.id));
        } else if (value) {
          onChange(value.id);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Seleccione Producto(s)"
          placeholder="Buscar producto"
          size="small"
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
        />
      )}
      sx={{ minWidth: 200 }}
    />
  );
};

export default DdownMultiSearchProduct;
