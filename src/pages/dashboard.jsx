import Grid from "@mui/material/Grid2";
// import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// import ChartUserByCountry from "../dashboard/components/ChartUserByCountry";
// import CustomizedTreeView from "../dashboard/components/CustomizedTreeView";
// import CustomizedDataGrid from "../dashboard/components/CustomizedDataGrid";
// import HighlightedCard from "../dashboard/components/HighlightedCard";
// import PageViewsBarChart from "../dashboard/components/PageViewsBarChart";
import { Copyright } from "@mui/icons-material";
import SessionsChart from "../dash/SessionsChart";
import moment from "moment";
import SessionsChartQuantity from "../dash/SessionsChartquantity";
import { Container, Stack } from "@mui/material";
import Header from "../dash/Header";
import StatCard from "../dash/StatCard";
import HighlightedCard from "../dash/HighlightedCard";
import PageViewsBarChart from "../dash/PageViewsBarChart";
import StatCardOriginal from "../dash/StatCardOriginal";
import SessionsChartOriginal from "../dash/SessionsChartOriginal";
moment().format();
moment().locale("es");

const data = [
  {
    title: "Producto más vendido",
    value: "14k",
    interval: "Últimos 30 días",
    trend: "up",
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340,
      380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: "2do producto más vendido",
    value: "325",
    interval: "Últimos 30 días",
    trend: "neutral",
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510,
      530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
  {
    title: "3er producto más vendido",
    value: "200k",
    interval: "Últimos 30 días",
    trend: "down",
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600,
      820, 780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300,
      220,
    ],
  },
];
export default function Dashboard() {
  return (
    <>
      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
          mx: 3,
          pb: 5,
          mt: { xs: 8, md: 0 },
        }}
      >
        <Header />
        <Grid
          container
          spacing={2}
          columns={12}
          sx={{
            mb: (theme) => theme.spacing(2),
            width: "100%",
            maxWidth: { sm: "100%", md: "1700px" },
          }}
        >
          {data.map((card, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
              <StatCardOriginal {...card} />
            </Grid>
          ))}
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <HighlightedCard />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SessionsChartOriginal />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <PageViewsBarChart />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          columns={12}
          sx={{
            mb: (theme) => theme.spacing(2),
            width: "100%",
            maxWidth: { sm: "100%", md: "1700px" },
          }}
        >
          <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
            Predicción General de ventas
          </Typography>
          <Grid size={{ xs: 12, md: 12 }}>
            <SessionsChartQuantity />
          </Grid>
          <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
            Predicción General de montos de ventas
          </Typography>
          <Grid size={{ xs: 12, md: 12 }}>
            <SessionsChart />
          </Grid>
        </Grid>

        {/* <Copyright sx={{ my: 4 }} /> */}
      </Stack>
      {/* </Container> */}
    </>
  );
}
