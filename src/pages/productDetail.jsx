import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { Copyright } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DetailChart from "../productDetail/DetailChart";
import { Container } from "@mui/material";

export default function ProductDetail() {
  const [product, setProduct] = useState({});
  // const [predicciones, setPredicciones] = useState([]);
  let params = useParams();

  useEffect(() => {
    const apiFetch = async () => {
      const { data: productosData } = await axios.get(
        "http://localhost:8000/api/productos/list"
      );

      const productDetailData = productosData.find(
        (product) => `${product.id_producto}` === params.productId
      );
      setProduct(productDetailData);
    };
    apiFetch();
  }, []);

  return (
    <Container>
      {/* cards */}
      <Typography component="h2" variant="h5" color="info" sx={{ mb: 2 }}>
        Detalle del producto
      </Typography>
      <Typography
        component="p"
        variant="body1"
        style={{ fontWeight: 600 }}
        sx={{ mb: 2 }}
      >
        Nombre: {product.nombre}
      </Typography>
      <Typography component="p" variant="body1" sx={{ mb: 2 }}>
        Precio de venta: {product.precio_venta}
      </Typography>
      <Typography component="p" variant="body1" sx={{ mb: 2 }}>
        Precio de compra: {product.precio_compra}
      </Typography>
      <Typography component="p" variant="body1" sx={{ mb: 2 }}>
        Margen de ganancia: {product.margen}
      </Typography>

      <Typography component="h2" variant="h5" color="info" sx={{ mb: 2 }}>
        Predicción de ventas
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {/* {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))} */}

        <Grid size={{ xs: 12, md: 12 }}>
          {/* <PageViewsBarChart /> */}
          <DetailChart id_producto={params.productId} />
        </Grid>
      </Grid>

      <Copyright sx={{ my: 4 }} />
    </Container>
  );
}
