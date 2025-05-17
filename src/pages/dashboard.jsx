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
import { Container } from "@mui/material";
moment().format();
moment().locale("es");

export default function Dashboard() {
  return (
    <Container>
      {/* cards */}
      <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
        Predicciones
      </Typography>

      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Predicción General de ventas
        </Typography>
        <Grid size={{ xs: 12, md: 12 }}>
          <SessionsChartQuantity />
        </Grid>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Predicción General de montos de ventas
        </Typography>
        <Grid size={{ xs: 12, md: 12 }}>
          <SessionsChart />
        </Grid>
      </Grid>

      <Copyright sx={{ my: 4 }} />
    </Container>
  );
}
