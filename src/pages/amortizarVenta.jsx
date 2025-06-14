import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { FaEdit, FaTrash } from "react-icons/fa";
import AgregarAmortizacionModal from "../amortizarVenta/agregarAmortizacionModal";
import FormAmortizar from "../amortizarVenta/FormAmortizar";
import EditarAmortizacionModal from "../amortizarVenta/editarAmortizacionModal";

export default function AmortizarVenta() {
  const [sale, setSale] = useState({});

  let params = useParams();

  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const apiFetch = async () => {
    const { data: saleData } = await axios.post(
      "http://localhost:8000/api/ventas/find-ID",
      {
        intIdVenta: params.saleId,
      }
    );

    const saleDataFind = saleData[0] ? saleData[0] : null;
    setSale(saleDataFind);
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ventas/amort/findByVenta`,
        { Id_Venta: params.saleId }
      );
      const responseMapped = response?.data?.data?.map((x) => ({
        ...x,
        FechaFormat: moment(x.FechaPago).format("DD-MM-YYYY"),
      }));
      setResultData(responseMapped);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    apiFetch();
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const sendAmortizacion = async (dto) => {
    const payload = {
      amortización: dto,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ventas/amort/create`,
        payload
      );
      if (![200, 201].includes(response.status)) {
        throw new Error("Error al procesar la amortización: Código inválido");
      }
      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Error inesperado al procesar la amortización"
        );
      }
      return response.data;
    } catch (err) {
      console.error(
        "Error en createAmortizacion:",
        err.response?.data || err.message
      );
      throw new Error(err.response?.data?.message || "Error al crear la venta");
    }
  };

  const sendAmortizacionEdit = async (dto) => {
    const payload = {
      amortización: dto,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ventas/amort/edit`,
        payload
      );
      if (![200, 201].includes(response.status)) {
        throw new Error("Error al procesar la amortización: Código inválido");
      }
      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Error inesperado al procesar la amortización"
        );
      }
      return response.data;
    } catch (err) {
      console.error(
        "Error en createAmortizacion:",
        err.response?.data || err.message
      );
      throw new Error(err.response?.data?.message || "Error al crear la venta");
    }
  };

  const sendPdf = async (dto) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ventas/export/pdf`,
        dto
      );
      if (![200, 201].includes(response.status)) {
        throw new Error("Error al procesar la amortización: Código inválido");
      }
      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Error inesperado al procesar la amortización"
        );
      }
      return response.data;
    } catch (err) {
      console.error(
        "Error en createAmortizacion:",
        err.response?.data || err.message
      );
      throw new Error(err.response?.data?.message || "Error al crear la venta");
    }
  };

  const descargarPDF = async (dto) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ventas/export/excel`,
        {
          ...dto,
        },
        {
          responseType: "blob", // 👈 importante
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer TU_TOKEN', si aplica
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "archivo.xlsx");
      document.body.appendChild(link);
      link.click();

      // Limpieza
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
    }
  };

  const handleSubmit = async (amortizacion) => {
    try {
      // setMessage(null);
      const amortizacionDto = {
        ...amortizacion,
        NumeroDocumento: "0",
        Id_Venta: params.saleId,
        Id_Cliente: sale.Id_Cliente,
        Id_Personal: 16,
        IdDocumento: "0",
      };

      const response = await sendAmortizacion(amortizacionDto);

      if (response.success) {
        // setRefreshHistorial(true); // Activar la bandera
        // setAlertVariant("success");
        // setMessage("Venta procesada correctamente");
        setOpen(false);
        apiFetch();
      } else {
        throw new Error(
          response.message || "Error desconocido al procesar la venta"
        );
      }
    } catch (error) {
      console.error("Error en handleAccept:", error);
      // setAlertVariant("danger");
      // setMessage(error.message || "Error al procesar la venta");
    }
  };
  const handleSubmitEdit = async (amortizacion) => {
    try {
      // setMessage(null);
      console.log("amortEdit");
      console.log(amortEdit);
      const amortizacionDto = {
        ...amortizacion,
        Id_Amort_Venta: amortEdit.Id_Amort_Venta,
        NumeroDocumento: "0",
        Id_Venta: params.saleId,
        Id_Cliente: sale.Id_Cliente,
        Id_Personal: 16,
        IdDocumento: "0",
      };

      const response = await sendAmortizacionEdit(amortizacionDto);

      if (response.success) {
        // setRefreshHistorial(true); // Activar la bandera
        // setAlertVariant("success");
        // setMessage("Venta procesada correctamente");
        setOpenEdit(false);
        apiFetch();
      } else {
        throw new Error(
          response.message || "Error desconocido al procesar la venta"
        );
      }
    } catch (error) {
      console.error("Error en handleAccept:", error);
      // setAlertVariant("danger");
      // setMessage(error.message || "Error al procesar la venta");
    }
  };
  const handleReport = async () => {
    try {
      const amortizacionDto = {
        fechaInicio: "2025-01-01",
        fechaFin: "2025-03-31",
      };

      const response = await descargarPDF(amortizacionDto);

      if (response.success) {
        //aaa
      } else {
        throw new Error(
          response.message || "Error desconocido al procesar la venta"
        );
      }
    } catch (error) {
      console.error("Error en handleAccept:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ventas/amort/anular`,
        {
          amortización: {
            Id_Amort_Venta: id,
            Id_Personal: 3003,
          },
        }
      );
      setResultData((prev) =>
        prev.map((x) =>
          x.Id_Amort_Venta === id ? { ...x, IdEstado: "ANL" } : x
        )
      );
    } catch (error) {
      console.error("Error eliminando venta:", error);
    }
  };

  const [amortEdit, setAmortEdit] = useState({});
  const handleEdit = (x) => {
    setAmortEdit(x);
    setOpenEdit(true);
  };

  const columns = [
    { field: "Id_Amort_Venta", headerName: "ID", flex: 1 },
    {
      field: "FechaFormat",
      headerName: "Fecha",
      flex: 1,
      // valueGetter: (params) => {
      //   return moment(params).format("DD/MM/YYYY");
      // },
    },
    { field: "Id_Cliente", headerName: "ID Cliente", flex: 1 },
    { field: "Nombres", headerName: "Cliente", flex: 1 },
    { field: "Monto", headerName: "Monto", flex: 1 },
    // { field: "Total_Devolucion", headerName: "Devolución", width: 100 },
    { field: "Observacion", headerName: "Observación", flex: 1 },
    { field: "IdTipoAmortizacion", headerName: "Tipo de Pago", flex: 1 },
    { field: "IdFormaPago", headerName: "Forma de Pago", flex: 1 },
    { field: "IdEstado", headerName: "Estado", flex: 1 },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <IconButton color="warning" onClick={() => handleEdit(params.row)}>
              <FaEdit />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleDelete(params.row.Id_Amort_Venta)}
            >
              <FaTrash />
            </IconButton>
          </>
        );
      },
    },
  ];

  const [montoAmortizado, setMontoAmortizado] = useState(0);
  useEffect(() => {
    const totalAmort = resultData?.reduce((acumulador, valorActual) => {
      if (valorActual.IdEstado === "ANL") return acumulador;
      return acumulador + valorActual.Monto;
    }, 0);
    setMontoAmortizado(totalAmort);
    // setAmortizacion((x) => ({
    //   ...x,
    //   Cliente: `${sale?.Id_Cliente} / ${sale?.Cliente}`,
    //   MontoRestante: sale?.Monto_Total - montoAmortizado,
    // }));
  }, [resultData]);

  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: "center",
        mx: 3,
        pb: 5,
        mt: { xs: 8, md: 0 },
      }}
    >
      <Header nav={["Amortizaciones", `Venta - ${params.saleId}`]} />
      <Stack
        direction="column"
        sx={{
          // display: { xs: "none", md: "flex" },
          width: "100%",
          justifyContent: "space-between",
          maxWidth: { sm: "100%", md: "1700px" },
          pt: 1.5,
        }}
        spacing={2}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Tabs editar venta"
          >
            <Tab label="Listado amortizaciones" />
            {/* <Tab label="Historial" /> */}
          </Tabs>
        </Box>

        <Box sx={{ mt: 2 }}>
          {value === 0 && (
            <FormAmortizar sale={sale} montoAmortizado={montoAmortizado} />
          )}
          {/* {value === 1 && <FormHistorialTableroElectronico />} */}
        </Box>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Button variant="contained" onClick={() => handleReport()}>
            Reportar
          </Button>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Amortizar
          </Button>
        </Stack>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ height: 600, mt: 2 }}>
            <DataGrid
              rows={resultData}
              columns={columns}
              getRowId={(row) => row.Id_Amort_Venta}
              checkboxSelection={false}
              disableRowSelectionOnClick
              pageSize={10}
            />
          </Box>
        )}
        <AgregarAmortizacionModal
          idVenta={params.saleId}
          sale={sale}
          amortizaciones={resultData}
          handleSubmit={handleSubmit}
          open={open}
          onClose={() => setOpen(false)}
        />

        <EditarAmortizacionModal
          idVenta={params.saleId}
          sale={sale}
          amortizaciones={resultData}
          amortizacionEdit={amortEdit}
          handleSubmit={handleSubmitEdit}
          open={openEdit}
          onClose={() => setOpenEdit(false)}
        />
      </Stack>
    </Stack>
  );
}
