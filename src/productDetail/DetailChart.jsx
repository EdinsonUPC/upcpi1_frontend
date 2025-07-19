import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
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
DetailChart.propTypes = {
  id_producto: PropTypes.string.isRequired,
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

export default function DetailChart({ id_producto }) {
  const theme = useTheme();
  const hoy = Date.now();
  const momemtSelected = moment(hoy).add(1, "M").format("MM");
  const [monthSelect, setMonthSelect] = useState(momemtSelected);

  const data = getDaysInMonth(
    parseInt(monthSelect),
    parseInt(moment(hoy).format("YYYY"))
  );

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [historialVentas, setHistorialVentas] = useState({});
  const [error, setError] = useState(null);
  const [prediccionVenta, setPrediccionVenta] = useState({});

  useEffect(() => {
    const apiFetch = async () => {
      const momemtHoyApi = moment(hoy)
        .set("month", monthSelect - 2)
        .endOf("month");
      const { data } = await axios.post(
        "http://localhost:8000/api/ventas/filterQuantityByProdByPeriod",
        {
          date: momemtHoyApi.format("YYYY-MM-DD"),
          Id_Producto: id_producto,
        }
      );

      const { data: dataPrediccion } = await axios.post(
        "http://localhost:8000/api/ventas/predictionQuantityByProdByPeriod",
        {
          date: momemtHoyApi.add(1, "M").format("YYYY-MM-DD"),
          Id_Producto: parseInt(id_producto),
        }
      );

      // const mesActual = momemtHoyApi.format("MM");
      setPrediccionVenta(dataPrediccion);
      setHistorialVentas(data);
    };
    apiFetch();
  }, [monthSelect]);

  const dataLinealGraphic = () => {
    const x = historialVentas.data
      ? historialVentas.data.map((mes) => mes.QuantitySold)
      : [];

    const y = prediccionVenta.prediccion
      ? prediccionVenta.prediccion.map((nodo) => nodo.QuantitySoldPredict)
      : [];
    return x.concat(y);
  };
  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Montos de venta
        </Typography>
        <Stack sx={{ justifyContent: "space-between", gap: 1 }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          >
            {/* <Typography variant="h4" component="p">
              13,277
              </Typography>
            <Chip size="small" color="success" label="+35%" /> */}
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Montos de ventas totales en los ultimos 12 meses y prediccion del
            mes siguiente
          </Typography>
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
        </Stack>

        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: "point",
              data,
              tickInterval: (index, i) => {
                return i + 1;
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
            // {
            //   id: "referral",
            //   label: "Referral",
            //   showMark: false,
            //   curve: "linear",
            //   stack: "total",
            //   area: true,
            //   stackOrder: "ascending",
            //   data: [500, 900, 700, 1400],
            // },
            // {
            //   id: 'organic',
            //   label: 'Organic',
            //   showMark: false,
            //   curve: 'linear',
            //   stack: 'total',
            //   stackOrder: 'ascending',
            //   data: [
            //     1000, 1500, 1200, 1700, 1300, 2000, 2400, 2200, 2600, 2800, 2500,
            //     3000, 3400, 3700, 3200, 3900, 4100, 3500, 4300, 4500, 4000, 4700,
            //     5000, 5200, 4800, 5400, 5600, 5900, 6100, 6300,
            //   ],
            //   area: true,
            // },
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
