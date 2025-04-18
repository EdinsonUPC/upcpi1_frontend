import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Copyright } from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useEffect, useState } from "react";
import CustomizedDataGrid from "../dashboard/components/CustomizedDataGrid";
import EnhancedTable from "../products/EnhancedTable";
import moment from "moment";
import axios from "axios";
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
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
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
    </Box>
  );
}
