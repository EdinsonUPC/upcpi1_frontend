import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Copyright } from "@mui/icons-material";
import StatCard from "../dashboard/components/StatCard";
import PageViewsBarChart from "../dashboard/components/PageViewsBarChart";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useParams } from "react-router-dom";
import DetailChart from "../productDetail/DetailChart";

export default function ProductDetail() {
  const data = [
    {
      title: "Users",
      value: "14k",
      interval: "Last 30 days",
      trend: "up",
      data: [
        200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360,
        340, 380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600,
        880, 920,
      ],
    },
  ];

  const [product, setProduct] = useState({});
  // const [predicciones, setPredicciones] = useState([]);
  const hoy = Date.now();
  const momemtHoy = moment(hoy);
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
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Detalle del producto
      </Typography>
      <Typography component="h4" variant="h6" sx={{ mb: 2 }}>
        Nombre: {product.nombre}
      </Typography>
      <Typography component="h4" variant="h6" sx={{ mb: 2 }}>
        Precio de venta: {product.precio_venta}
      </Typography>
      <Typography component="h4" variant="h6" sx={{ mb: 2 }}>
        Precio de compra: {product.precio_compra}
      </Typography>
      <Typography component="h4" variant="h6" sx={{ mb: 2 }}>
        Margen de ganancia: {product.margen}
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
    </Box>
  );
}
