import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// import ChartUserByCountry from "../dashboard/components/ChartUserByCountry";
// import CustomizedTreeView from "../dashboard/components/CustomizedTreeView";
// import CustomizedDataGrid from "../dashboard/components/CustomizedDataGrid";
// import HighlightedCard from "../dashboard/components/HighlightedCard";
// import PageViewsBarChart from "../dashboard/components/PageViewsBarChart";
import { Copyright } from "@mui/icons-material";
import SessionsChart from "../dash/SessionsChart";
import StatCard from "../dash/StatCard";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import SessionsChartQuantity from "../dash/SessionsChartquantity";
moment().format();
moment().locale("es");

export default function Dashboard() {
  // const [historialVentas, setHistorialVentas] = useState({});
  // const hoy = Date.now();
  // const momemtHoy = moment(hoy);

  // useEffect(() => {
  //   const apiFetch = async () => {
  //     const { data } = await axios.post(
  //       "http://localhost:8000/api/ventas/filterQuantityByPeriod",
  //       {
  //         date: momemtHoy.format("YYYY-MM-DD"),
  //       }
  //     );

  //     setHistorialVentas(data);
  //   };
  //   apiFetch();
  // }, []);

  // const dataLinealGraphic = () => {
  //   const x = historialVentas.data
  //     ? historialVentas.data.map((mes) => mes.TotalAmount)
  //     : [];

  //   return x;
  // };

  // const arrayDataLineal = dataLinealGraphic();
  // let tendencia = 0;
  // // Verificar si el array tiene al menos dos elementos
  // if (arrayDataLineal.length >= 2) {
  //   const penultimo = arrayDataLineal[arrayDataLineal.length - 2]; // Penúltimo elemento
  //   const ultimo = arrayDataLineal[arrayDataLineal.length - 1]; // Último elemento

  //   if (penultimo < ultimo) {
  //     tendencia = 1;
  //   } else {
  //     tendencia = -1;
  //   }
  // }

  // const data = [
  //   {
  //     title: "Monto de ventas de este mes",
  //     value: arrayDataLineal.length
  //       ? `${arrayDataLineal[arrayDataLineal.length - 1]}`
  //       : "0",
  //     interval: "Ultimos 3 meses",
  //     trend: tendencia > 0 ? "up" : "down",
  //     data: arrayDataLineal,
  //     month: momemtHoy.format("MM"),
  //     year: momemtHoy.format("YYYY"),
  //   },
  // ];

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Vista General
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
        <Grid size={{ xs: 12, md: 9 }}>
          <SessionsChartQuantity />
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <SessionsChart />
        </Grid>
      </Grid>

      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
