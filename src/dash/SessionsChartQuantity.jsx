import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";
import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
moment().format();
moment().locale("es");

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

function getDaysInMonth(month, year) {
  const days = [];

  for (let offset = -11; offset <= 1; offset++) {
    let newMonth = month + offset;
    let newYear = year;

    // Ajustar el año si el mes se sale del rango
    if (newMonth < 1) {
      newMonth += 12;
      newYear -= 1;
    } else if (newMonth > 12) {
      newMonth -= 12;
      newYear += 1;
    }

    const date = new Date(newYear, newMonth, 0);
    const monthName = date.toLocaleDateString("es-ES", { month: "short" });
    days.push(`${monthName} ${date.getDate()} ${newYear}`);
  }

  return days;
}
export default function SessionsChartQuantity() {
  const theme = useTheme();
  const hoy = Date.now();
  const momemtHoy = moment(hoy).format("MM");
  const momemtYear = moment(hoy).format("YYYY");
  const [monthSelect, setMonthSelect] = useState(momemtHoy);
  const [yearSelect, setYearSelect] = useState(momemtYear);

  const data = getDaysInMonth(parseInt(monthSelect), yearSelect);

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  // const [isLoading, setIsLoading] = useState(true);
  const [historialVentas, setHistorialVentas] = useState({});
  // const [error, setError] = useState(null);
  const [prediccionVenta, setPrediccionVenta] = useState({});

  useEffect(() => {
    const apiFetch = async () => {
      const momemtHoyApi = moment(hoy)
        .set("year", yearSelect)
        .set("month", monthSelect - 1)
        .set("date", 29);
      const { data } = await axios.post(
        "http://localhost:8000/api/ventas/filterQuantityByPeriod",
        {
          date: momemtHoyApi.format("YYYY-MM-DD"),
        }
      );
      const { data: dataPrediccion } = await axios.post(
        "http://localhost:8000/api/ventas/predictionQuantityByPeriod",
        {
          date: momemtHoyApi.add(1, "M").format("YYYY-MM-DD"),
        }
      );

      console.log("data");
      console.log(data);
      console.log("dataPrediccion");
      console.log(dataPrediccion);
      setPrediccionVenta(dataPrediccion);
      setHistorialVentas(data);
    };
    apiFetch();
  }, [monthSelect, yearSelect]);

  const dataLinealGraphic = () => {
    const x = historialVentas.data
      ? historialVentas.data.map((mes) => mes.QuantitySold)
      : [];

    const y = prediccionVenta.prediccion
      ? prediccionVenta.prediccion.map((nodo) => nodo.QuantitySoldPredict)
      : [];
    return x.concat(y);
  };

  console.log(dataLinealGraphic());
  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Cantidades vendidas(Kg)
        </Typography>
        <Stack sx={{ justifyContent: "space-between", gap: 1 }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          ></Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Cantidad vendida(Kg) en los ultimos 12 meses y prediccion del mes
            siguiente
          </Typography>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <TextField
              select
              sx={{ minWidth: 150 }}
              label="Mes seleccionado"
              value={monthSelect}
              onChange={(event) => setMonthSelect(event.target.value)}
            >
              <MenuItem value="01">Enero</MenuItem>
              <MenuItem value="02">Febrero</MenuItem>
              <MenuItem value="03">Marzo</MenuItem>
              <MenuItem value="04">Abril</MenuItem>
              <MenuItem value="05">Mayo</MenuItem>
              <MenuItem value="06">Junio</MenuItem>
              <MenuItem value="07">Julio</MenuItem>
              <MenuItem value="08">Agosto</MenuItem>
              <MenuItem value="09">Septiembre</MenuItem>
              <MenuItem value="10">Octubre</MenuItem>
              <MenuItem value="11">Noviembre</MenuItem>
              <MenuItem value="12">Diciembre</MenuItem>
            </TextField>
            <TextField
              select
              sx={{ minWidth: 150 }}
              label="Año"
              value={yearSelect}
              onChange={(event) => setYearSelect(event.target.value)}
            >
              <MenuItem value="2016">2016</MenuItem>
              <MenuItem value="2017">2017</MenuItem>
              <MenuItem value="2018">2018</MenuItem>
              <MenuItem value="2019">2019</MenuItem>
              <MenuItem value="2020">2020</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
              <MenuItem value="2022">2022</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2025">2025</MenuItem>
              <MenuItem value="2026">2026</MenuItem>
              <MenuItem value="2027">2027</MenuItem>
            </TextField>
          </Stack>
        </Stack>

        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: "point",
              data,
              tickInterval: (index, i) => {
                return i + 1;
                // return (i + 1) % 30 === 0;
              },
            },
          ]}
          series={[
            {
              id: "direct",
              label: "Monto de ventas",
              showMark: false,
              curve: "linear",
              stack: "total",
              area: true,
              stackOrder: "ascending",
              data: dataLinealGraphic(),
            },
          ]}
          height={250}
          margin={{ left: 80, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            "& .MuiAreaElement-series-organic": {
              fill: "url('#organic')",
            },
            "& .MuiAreaElement-series-referral": {
              fill: "url('#referral')",
            },
            "& .MuiAreaElement-series-direct": {
              fill: "url('#direct')",
            },
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        >
          {/* <AreaGradient color={theme.palette.primary.dark} id="organic" /> */}
          <AreaGradient color={theme.palette.primary.main} id="referral" />
          <AreaGradient color={theme.palette.primary.light} id="direct" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
