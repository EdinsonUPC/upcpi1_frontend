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
moment().format();
moment().locale("es");

// const data = [
//   {
//     title: "Monto de ventas de este mes",
//     value: "14k",
//     interval: "Ultimos 3 meses",
//     trend: "up",
//     data: dataLinealGraphic(),
//   },
// {
//   title: "Conversions",
//   value: "325",
//   interval: "Last 30 days",
//   trend: "down",
//   data: [
//     1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600,
//     820, 780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300,
//     220,
//   ],
// },
// {
//   title: "Event count",
//   value: "200k",
//   interval: "Last 30 days",
//   trend: "neutral",
//   data: [
//     500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510,
//     530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
//   ],
// },
// ];

export default function Dashboard() {
  const [historialVentas, setHistorialVentas] = useState({});
  const hoy = Date.now();
  const momemtHoy = moment(hoy);

  useEffect(() => {
    const apiFetch = async () => {
      const { data } = await axios.post(
        "http://localhost:8000/api/ventas/filterQuantityByPeriod",
        {
          date: momemtHoy.format("YYYY-MM-DD"),
        }
      );

      setHistorialVentas(data);
    };
    apiFetch();
  }, []);

  const dataLinealGraphic = () => {
    const x = historialVentas.prediccion
      ? historialVentas.prediccion.map((mes) => mes.TotalAmount)
      : [];

    return x;
  };

  const array = dataLinealGraphic();
  let tendencia = 0;
  // Verificar si el array tiene al menos dos elementos
  if (array.length >= 2) {
    const penultimo = array[array.length - 2]; // Penúltimo elemento
    const ultimo = array[array.length - 1]; // Último elemento

    if (penultimo < ultimo) {
      tendencia = 1;
    } else {
      tendencia = -1;
    }
  }

  const data = [
    {
      title: "Monto de ventas de este mes",
      value: array.length ? `${array[array.length - 1]}` : "0",
      interval: "Ultimos 3 meses",
      trend: tendencia > 0 ? "up" : "down",
      data: array,
      month: momemtHoy.format("MM"),
      year: momemtHoy.format("YYYY"),
    },
  ];

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
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        {/* <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <HighlightedCard />
      </Grid> */}
        <Grid size={{ xs: 12, md: 9 }}>
          <SessionsChart />
        </Grid>
        {/* <Grid size={{ xs: 12, md: 3 }}>
          <ChartUserByCountry />
        </Grid> */}
        {/* <Grid size={{ xs: 12, md: 6 }}>
        <PageViewsBarChart />
      </Grid> */}
      </Grid>
      {/* <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
      Details
    </Typography>
    <Grid container spacing={2} columns={12}>
      <Grid size={{ xs: 12, lg: 9 }}>
        <CustomizedDataGrid />
      </Grid>
      <Grid size={{ xs: 12, lg: 3 }}>
        <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "column" }}>
          <CustomizedTreeView />
          <ChartUserByCountry />
        </Stack>
      </Grid>
    </Grid> */}
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
