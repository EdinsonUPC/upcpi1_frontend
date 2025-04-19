import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import FilterButtonsMUI from "../mantenimientoVenta/FilterButtonsMUI";

const VentasListadoMUI = ({ setSelectedVenta, setActiveStep }) => {
  const [filterData, setFilterData] = useState({
    datFechaInicial: moment().format("YYYY-MM-DD"),
    datFechaFinal: moment().format("YYYY-MM-DD"),
    varIdProductos: [],
    varIdClientes: [],
    numMontoInicial: 0,
    numMontoFinal: 0,
    numSaldoInicial: 0,
    numSaldoFinal: 0,
    varSearchText: "",
    varEstados: [],
  });

  const [resultData, setResultData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [loading, setLoading] = useState(false);

  const tempToken = localStorage.getItem("user"); // Tu función de cookies

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ventas/find`,
        { ...filterData, token: tempToken }
      );
      setResultData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (Id_Venta) => {
    setSelectedData((prev) =>
      prev.includes(Id_Venta)
        ? prev.filter((id) => id !== Id_Venta)
        : [...prev, Id_Venta]
    );
  };

  const handleDelete = async (Id_Venta) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ventas/eliminar-venta`,
        {
          token: tempToken,
          intIdVenta: Id_Venta,
        }
      );
      setResultData((prev) => prev.filter((x) => x.Id_Venta !== Id_Venta));
    } catch (error) {
      console.error("Error eliminando venta:", error);
    }
  };

  const handleEdit = (sale) => {
    setActiveStep(2);
    setSelectedVenta(sale);
  };

  const columns = [
    {
      field: "select",
      headerName: "",
      width: 50,
      renderCell: (params) => (
        <Checkbox
          checked={selectedData.includes(params.row.Id_Venta)}
          onChange={() => handleSelect(params.row.Id_Venta)}
        />
      ),
    },
    { field: "Id_Venta", headerName: "ID", width: 90 },
    {
      field: "Fecha",
      headerName: "Fecha",
      width: 100,
      valueGetter: (params) =>
        moment(params.value).isValid()
          ? moment(params.value).format("DD/MM")
          : "",
    },
    { field: "Cliente", headerName: "Cliente", width: 150 },
    { field: "Producto", headerName: "Producto", width: 150 },
    { field: "Total_Devolucion", headerName: "Devolución", width: 100 },
    { field: "Total_Peso_Neto", headerName: "Peso Neto", width: 100 },
    { field: "Precio", headerName: "Precio", width: 100 },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton color="warning" onClick={() => handleEdit(params.row)}>
            <FaEdit />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.Id_Venta)}
          >
            <FaTrash />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <FilterButtonsMUI
          filterData={filterData}
          setFilterData={setFilterData}
          handleApplyFilters={handleSearch}
        ></FilterButtonsMUI>
        <Button variant="contained" onClick={handleSearch}>
          Buscar
        </Button>
      </Stack>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={resultData}
            columns={columns}
            getRowId={(row) => row.Id_Venta}
            checkboxSelection={false}
            disableRowSelectionOnClick
            pageSize={10}
          />
        </Box>
      )}
    </Container>
  );
};

export default VentasListadoMUI;
