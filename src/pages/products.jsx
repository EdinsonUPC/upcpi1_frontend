import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { Copyright } from "@mui/icons-material";
import { useEffect, useState } from "react";
import EnhancedTable from "../products/EnhancedTable";
import moment from "moment";
import axios from "axios";
import { Container } from "@mui/material";
moment().format();
moment().locale("es");

export default function Products() {
  const [products, setProducts] = useState([]);
  // const [predicciones, setPredicciones] = useState([]);
  const hoy = Date.now();
  const momemtHoy = moment(hoy);

  useEffect(() => {
    const apiFetch = async () => {
      const { data: productosData } = await axios.get(
        "http://localhost:8000/api/productos/list"
      );

      const { data } = await axios.post(
        "http://localhost:8000/api/ventas/predictionQuantityByPeriodListProd",
        {
          date: momemtHoy.format("YYYY-MM-DD"),
        }
      );
      const productosFormat = productosData.map((producto) => {
        return {
          ...producto,
          prediccion: data.prediccion.find(
            (x) => x.Id_Product === producto.id_producto
          ),
        };
      });
      setProducts(productosFormat);
    };
    apiFetch();
  }, []);

  return (
    <Container>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Productos
      </Typography>
      {/* <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography> */}
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 12, lg: 12 }}>
          <EnhancedTable data={products} />
        </Grid>
        {/* <Grid size={{ xs: 12, md: 12, lg: 12 }}>
          <CustomizedDataGrid />
        </Grid> */}
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Container>
  );
}
