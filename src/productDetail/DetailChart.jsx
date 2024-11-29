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
  const date1 = new Date(year, month - 3, 0);
  const date2 = new Date(year, month - 2, 0);
  const date3 = new Date(year, month - 1, 0);
  const date4 = new Date(year, month, 0);
  const date5 = new Date(year, month + 1, 0);
  const monthName1 = date1.toLocaleDateString("es-ES", {
    month: "short",
  });
  const monthName2 = date2.toLocaleDateString("es-ES", {
    month: "short",
  });
  const monthName3 = date3.toLocaleDateString("es-ES", {
    month: "short",
  });
  const monthName4 = date4.toLocaleDateString("es-ES", {
    month: "short",
  });
  const monthName5 = date5.toLocaleDateString("es-ES", {
    month: "short",
  });
  const daysInMonth1 = date1.getDate();
  const daysInMonth2 = date2.getDate();
  const daysInMonth3 = date3.getDate();
  const daysInMonth4 = date4.getDate();
  const daysInMonth5 = date5.getDate();
  // console.log(daysInMonth1);
  // console.log(daysInMonth2);
  // console.log(daysInMonth3);
  // console.log(daysInMonth4);
  const days = [];
  days.push(`${monthName1} ${daysInMonth1}`);
  days.push(`${monthName2} ${daysInMonth2}`);
  days.push(`${monthName3} ${daysInMonth3}`);
  days.push(`${monthName4} ${daysInMonth4}`);
  days.push(`${monthName5} ${daysInMonth5}`);

  // console.log(days);
  return days;
}

export default function DetailChart({ id_producto }) {
  const theme = useTheme();
  const hoy = Date.now();
  const momemtHoy = moment(hoy).format("MM");
  const [monthSelect, setMonthSelect] = useState(momemtHoy);

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
        .set("month", monthSelect - 1)
        .set("date", 1);
      // console.log("momemtHoyApi");
      // console.log(momemtHoyApi.format("YYYY-MM-DD"));
      // console.log(momemtHoyApi.add(1, "M").format("YYYY-MM-DD"));
      const { data } = await axios.post(
        "http://localhost:8000/api/ventas/filterQuantityByProdByPeriod",
        {
          date: momemtHoyApi.format("YYYY-MM-DD"),
          Id_Producto: id_producto,
        }
      );
      console.log("dataPrediccion");
      console.log(data);

      const mesActual = momemtHoyApi.format("MM");
      const arrayGrafico = [
        mesActual - 3,
        mesActual - 2,
        mesActual - 1,
        parseInt(mesActual),
      ];
      console.log(arrayGrafico);
      const nuevoArray = arrayGrafico.map((x) => {
        return data.prediccion.find((registro) => registro.Month === x)
          ? data.prediccion.find((registro) => registro.Month === x)
          : {
              Id_Product: id_producto,
              Year: momemtHoyApi.format("YYYY"),
              Month: x,
              QuantitySold: 0,
              TotalAmount: 0,
            };
      });
      const { data: dataPrediccion } = await axios.post(
        "http://localhost:8000/api/ventas/predictionQuantityByProdByPeriod",
        {
          date: momemtHoyApi.add(1, "M").format("YYYY-MM-DD"),
          Id_Producto: parseInt(id_producto),
        }
      );

      // const mesActual = momemtHoyApi.format("MM");
      console.log("mesActual");
      console.log(dataPrediccion);
      setPrediccionVenta(dataPrediccion);
      setHistorialVentas({ ...data, prediccion: nuevoArray });
    };
    apiFetch();
  }, [monthSelect]);

  console.log(historialVentas);
  console.log(prediccionVenta);

  const dataLinealGraphic = () => {
    const x = historialVentas.prediccion
      ? historialVentas.prediccion.map((mes) => mes.QuantitySold)
      : [];

    console.log(x);
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
            Montos de ventas totales en los ultimos 4 meses
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
                // console.log(i);
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
