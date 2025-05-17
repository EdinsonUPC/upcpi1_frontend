import {
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Alert,
  Button,
  FormLabel,
  Stack,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import moment from "moment";
import { useEffect, useRef, useState } from "react";
import DdownMultiSearchPersonal from "../components/DdownMultiSearchPersonal.jsx";
import DdownMultiSearchProduct from "../components/DdownMultiSearchProduct.jsx";
import DdownMultiSearchClient from "../components/DdownMultiSearchClient.jsx";
// import repositoryParametroInstance from "../repositorys/parametrosRepository";
import DdownSearchParametro from "../components/DdownSearchParametro.jsx";
import repositoryVentasInstance from "../repositorys/ventasRepository.js";
import dtoVenta from "../tableroReporte/dtoVenta.js";
import DetalleTransaccionEdit from "./DetalleTransaccionEdit.jsx";

// import DdownMultiSearchPersonal from './DdownMultiSearchPersonal';
// import DdownMultiSearchProduct from './DdownMultiSearchProduct';
// import DdownMultiSearchClient from './DdownMultiSearchClient';
// import DdownSearchVenta from './DdownSearchVenta';
// import NotaVentaForPrint from './NotaVentaForPrint';
// import DetalleTransaccion from './DetalleTransaccion';
// import DdownSearchParametro from './DdownSearchParametro';

const FormEditSale = ({ sale }) => {
  const [venta, setVenta] = useState(dtoVenta());

  useEffect(() => {
    console.log("sale.lineasVenta");
    console.log(sale.lineasVenta);
    const lineasVentaTemporal = sale.lineasVenta?.map((linea) => ({
      ...linea,
      PesoBruto: linea.Peso_Bruto,
      PesoTara: linea.Peso_Tara,
      PesoNeto: linea.Peso_Neto,
      CantidadJavas: linea.Cantidad_Javas,
      detalleTaraOpciones: JSON.parse(linea.detalleTaraOpciones),
    }));
    console.log(lineasVentaTemporal);
    setVenta({
      IdVenta: sale.Id_Venta,
      Precio: sale.Precio,
      MontoSubTotal: 0,
      MontoIGV: 0,
      MontoTotal: sale.Monto_Total,
      TotalPesoBruto: sale.Total_Peso_Bruto,
      TotalPesoTara: sale.Total_Peso_Tara,
      TotalPesoNeto: sale.Total_Peso_Neto,
      Observacion: sale.Observacion,
      IdCliente: sale.Id_Cliente,
      IdEstado: sale.Estado,
      IdEmpresa: 1,
      IdProducto: sale.Id_Producto,
      ListaLineaVenta: lineasVentaTemporal ? lineasVentaTemporal : [],
      TotalUnidades: sale.TotalUnidades,
      fecha: sale.Fecha,
      IdPesador: sale.IdPesador,
      tipoTransaccion: "",
      idTipoDocumento: "0",
      idFormaPago: "EFE",
      idBanco: "",
    });
    setDefaultRefs({
      IdPesador: sale.IdPesador,
      idProducto: sale.Id_Producto,
      idCliente: sale.Id_Cliente,
      idTipoPago: sale.idTipoDocumento,
      idFormaPago: sale.idFormaPago,
    });
  }, [sale]);
  console.log("venta");
  console.log(venta);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [selectedTipo, setSelectedTipo] = useState("venta");
  const [message, setMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("success");
  const [showSensitiveData, setShowSensitiveData] = useState(false);

  // Actualizar Redux y estado local al cambiar fecha
  const handleFechaChange = (newFecha) => {
    setVenta((prev) => ({ ...prev, fecha: newFecha }));
  };

  // Actualizar Redux y estado local al cambiar IdPesador
  const handlePesadorChange = (newIdPesador) => {
    setVenta((prev) => ({ ...prev, IdPesador: newIdPesador }));
  };

  // Calcular totales de la venta
  const calcularTotales = () => {
    const totalPesoBruto = venta.ListaLineaVenta.reduce(
      (sum, item) => sum + (item.PesoBruto || 0),
      0
    );
    const totalPesoTara = venta.ListaLineaVenta.reduce(
      (sum, item) => sum + (item.PesoTara || 0),
      0
    );
    const totalPesoNeto = totalPesoBruto - totalPesoTara;
    const montoSubTotal = totalPesoNeto * (venta.Precio || 0);
    const montoIgv = (montoSubTotal || 0) * 0.18;
    const montoTotal = montoSubTotal + montoIgv;

    return {
      totalPesoBruto,
      totalPesoTara,
      totalPesoNeto,
      montoSubTotal,
      montoIgv,
      montoTotal,
    };
  };

  // const { totalPesoBruto, totalPesoTara, totalPesoNeto, monto } =
  //   calcularTotales();

  const [totales, setTotales] = useState(calcularTotales());

  useEffect(() => {
    setTotales(calcularTotales());
  }, [venta.ListaLineaVenta]);

  // Manejar cambio de tipo de transacción (radio buttons)

  const handleReset = () => {
    const tempVenta = dtoVenta();
    tempVenta.IdVenta = 0;
    tempVenta.ListaLineaVenta = [];
    tempVenta.ListaLineaVenta.push({
      IdLineaVenta: 0,
      PesoJava: 0,
      PesoBruto: 0,
      PesoTara: 0,
      PesoNeto: 0,
      CantidadJavas: 0,
      EsDevolucion: "N",
      EsPesoTaraEditado: "N",
      TaraEditada: 0,
      Observacion: "",
      IdEstado: "REG",
      IdVenta: 0,
      FlagJava: "N",
      Secuencial: 0,
      Unidades: 0,
      detalleTaraOpciones: undefined,
    });

    setVenta({ ...tempVenta, ListaLineaVenta: [] });
    setSelectedTipo("venta");
    resetearRefs();
    setTimeout(() => setMessage(null), 5000);
  };

  const handleAccept = async () => {
    if (venta.Precio <= 0) {
      setAlertVariant("danger");
      setMessage("El precio debe ser mayor a 0.");
      return;
    }

    if (totales.totalPesoNeto <= 0) {
      setAlertVariant("danger");
      setMessage("El total neto debe ser mayor a 0.");
      return;
    }

    if (venta.ListaLineaVenta.length === 0) {
      setAlertVariant("danger");
      setMessage("Debe agregar al menos una línea de venta.");
      return;
    }

    const confirm = window.confirm(
      "¿Está seguro de que desea editar esta venta?"
    );
    if (!confirm) return;

    try {
      setMessage(null);

      const updatedVenta = {
        ...venta,
        fecha: venta.fecha,
        IdEmpresa: 1,
        MontoSubTotal: totales.montoSubTotal,
        MontoIGV: totales.montoIgv,
        MontoTotal: totales.montoTotal,
        TotalPesoBruto: totales.totalPesoBruto,
        TotalPesoTara: totales.totalPesoTara,
        TotalPesoNeto: totales.totalPesoNeto,
        ListaLineaVenta: venta.ListaLineaVenta.map((linea) => ({
          ...linea,
          detalleTaraOpciones:
            typeof linea.detalleTaraOpciones === "string"
              ? linea.detalleTaraOpciones
              : JSON.stringify(linea.detalleTaraOpciones),
        })),
        // TotalJabas:
        // TotalUnidades:,
        // TotalAmortizacion:TotalAmortizacion,
        // TotalSaldo:TotalSaldo,
      };

      const response = await repositoryVentasInstance.editVenta(updatedVenta);

      if (response.success) {
        //alert('esperando'); FormTableroElectronico
        // Refrescar el historial
        // setRefreshHistorial(true); // Activar la bandera
        setAlertVariant("success");
        setMessage("Venta procesada correctamente");
        handleReset();
      } else {
        throw new Error(
          response.message || "Error desconocido al procesar la venta"
        );
      }
    } catch (error) {
      console.error("Error en handleAccept:", error);
      setAlertVariant("danger");
      setMessage(error.message || "Error al procesar la venta");
    }
  };

  const fetchPrecioVenta = async (idCliente, idProducto) => {
    try {
      if (idCliente && idProducto) {
        const precio = await repositoryVentasInstance.getPrecioVenta(
          idCliente,
          idProducto
        );
        setVenta((prev) => ({ ...prev, Precio: precio }));
      }
    } catch (error) {
      console.error("Error al obtener el precio:", error);
      setMessage(
        "Error al obtener el precio para el producto y cliente seleccionados."
      );
      setAlertVariant("danger");
    }
  };

  useEffect(() => {
    if (venta.IdCliente && venta.IdProducto) {
      fetchPrecioVenta(venta.IdCliente, venta.IdProducto);
    }
  }, [venta.IdCliente, venta.IdProducto]);

  const handleChangeDdown = (data) => {
    setVenta((prevData) => ({ ...prevData, [data.name]: data.value }));
  };

  const pesadorRef = useRef();
  const productoRef = useRef();
  const clienteRef = useRef();
  const tipoPagoRef = useRef();
  const formaPagoRef = useRef();

  const setDefaultRefs = (x) => {
    pesadorRef.current?.setValue(x.IdPesador);
    productoRef.current?.setValue(x.idProducto);
    clienteRef.current?.setValue(x.idCliente);
    tipoPagoRef.current?.reset(x.idTipoPago);
    formaPagoRef.current?.reset(x.idFormaPago);
  };

  const resetearRefs = () => {
    productoRef.current?.reset();
    clienteRef.current?.reset();
    tipoPagoRef.current?.reset();
    formaPagoRef.current?.reset();
  };
  return (
    <Container>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            Datos de la Venta: {venta.IdVenta}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            {/* <FormControl component="fieldset">
              <FormLabel component="legend">Tipo de Transacción</FormLabel>
              <RadioGroup
                row
                value={selectedTipo}
                onChange={(e) => handleRadioChange(e.target.value)}
              >
                <FormControlLabel
                  value="venta"
                  control={<Radio />}
                  label="Venta"
                />
                <FormControlLabel
                  value="venta_compra"
                  control={<Radio />}
                  label="Venta y Compra"
                />
                <FormControlLabel
                  value="venta_control"
                  control={<Radio />}
                  label="Venta y Control"
                />
              </RadioGroup>
            </FormControl> */}

            <Stack direction="row" spacing={2}>
              <Stack spacing={1} flex={1}>
                <FormLabel>Fecha</FormLabel>
                <TextField
                  fullWidth
                  type="date"
                  value={venta.fecha}
                  onChange={(e) => handleFechaChange(e.target.value)}
                />
              </Stack>

              <Stack spacing={1} flex={1}>
                <FormLabel>Pesador</FormLabel>
                <DdownMultiSearchPersonal
                  ref={pesadorRef}
                  multiple={false}
                  onChange={(value) => handlePesadorChange(parseInt(value))}
                  defaultValue={venta.IdPesador}
                />
              </Stack>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Detalle venta</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={3}>
            {/* Producto y Cliente */}
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <Box width={{ xs: "100%", md: "20%" }}>
                <Typography>Producto:</Typography>
              </Box>
              <Box width={{ xs: "100%", md: "40%" }}>
                <DdownMultiSearchProduct
                  ref={productoRef}
                  multiple={false}
                  onChange={(value) =>
                    setVenta({ ...venta, IdProducto: value })
                  }
                />
              </Box>
            </Stack>

            <Box>
              <DdownMultiSearchClient
                ref={clienteRef}
                multiple={false}
                onChange={(value) => setVenta({ ...venta, IdCliente: value })}
              />
            </Box>

            {/* Datos sensibles */}
            {showSensitiveData && (
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Box flex={1}>
                  <Typography>Precio:</Typography>
                  <TextField
                    fullWidth
                    type="number"
                    value={venta.Precio}
                    inputProps={{ style: { textAlign: "right" } }}
                    onChange={(e) => {
                      const newValue = parseFloat(e.target.value);
                      setVenta({
                        ...venta,
                        Precio: isNaN(newValue)
                          ? 0
                          : parseFloat(newValue.toFixed(2)),
                      });
                    }}
                  />
                </Box>

                <Box flex={1}>
                  <Typography>Observación:</Typography>
                  <TextField
                    fullWidth
                    value={venta.Observacion || ""}
                    onChange={(e) =>
                      setVenta({ ...venta, Observacion: e.target.value })
                    }
                  />
                </Box>
              </Stack>
            )}

            {/* Botón de mostrar/ocultar datos sensibles */}
            <Button
              variant="outlined"
              onClick={() => setShowSensitiveData(!showSensitiveData)}
            >
              {showSensitiveData
                ? "Ocultar Datos Sensibles"
                : "Mostrar Datos Sensibles"}
            </Button>

            {/* Detalle transacción */}
            <DetalleTransaccionEdit
              onUpdate={(lineas) =>
                setVenta({ ...venta, ListaLineaVenta: lineas })
              }
              lineasIniciales={venta.ListaLineaVenta}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Totales</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Box flex={1}>
              <Typography>Total Peso Bruto:</Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={totales.totalPesoBruto.toFixed(2)}
                readOnly={true}
              />
            </Box>
            <Box flex={1}>
              <Typography>Total Peso Tara:</Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={totales.totalPesoTara.toFixed(2)}
                readOnly={true}
              />
            </Box>
          </Stack>

          {/* Segunda fila */}

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Box flex={1}>
              <Typography>Total Peso Neto:</Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={totales.totalPesoNeto.toFixed(2)}
                readOnly={true}
              />
            </Box>
            <Box flex={1}>
              <Typography>Monto Subtotal:</Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={totales.montoSubTotal.toFixed(2)}
                readOnly={true}
              />
            </Box>
          </Stack>

          {/* Tercera fila */}

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Box flex={1}>
              <Typography>Monto Igv:</Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={totales.montoIgv.toFixed(2)}
                readOnly={true}
              />
            </Box>
            <Box flex={1}>
              <Typography>Monto Total:</Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={totales.montoTotal.toFixed(2)}
                readOnly={true}
              />
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Datos de Pago</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Stack spacing={3}>
            {/* Fila: Tipo y Forma de Pago */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems="center"
            >
              <Box sx={{ flex: 1 }}>
                <Typography>Tipo de Pago:</Typography>
              </Box>
              <Box sx={{ flex: 2 }}>
                <DdownSearchParametro
                  ref={tipoPagoRef}
                  selectedValue={venta.idTipoDocumento}
                  onChange={handleChangeDdown}
                  name="idTipoDocumento"
                  idParametro={8}
                  defaultOption={{
                    key: 0,
                    text: "Seleccione Tipo de Pago",
                    value: 0,
                  }}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography>Forma de Pago:</Typography>
              </Box>
              <Box sx={{ flex: 2 }}>
                <DdownSearchParametro
                  ref={formaPagoRef}
                  selectedValue={venta.idFormaPago}
                  onChange={handleChangeDdown}
                  name="idFormaPago"
                  idParametro={7}
                  notInit={true}
                  filtroParametroDetallePadre={venta.idTipoDocumento}
                />
              </Box>
            </Stack>

            {/* Fila: Banco y Número de Operación (solo para ciertos métodos) */}
            {["DEP", "DET", "CHQ"].includes(venta.idFormaPago) && (
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                alignItems="center"
              >
                <Box sx={{ flex: 1 }}>
                  <Typography>Banco:</Typography>
                </Box>
                <Box sx={{ flex: 2 }}>
                  <DdownSearchParametro
                    selectedValue={venta.idBanco}
                    onChange={handleChangeDdown}
                    name="idBanco"
                    idParametro={11}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography>Nro Operación:</Typography>
                </Box>
                <Box sx={{ flex: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Ingrese el nro operación"
                    value={venta.NumeroDocumento}
                    onChange={(e) =>
                      setVenta({ ...venta, NumeroDocumento: e.target.value })
                    }
                  />
                </Box>
              </Stack>
            )}

            {/* Fila: Monto Amortización */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems="center"
            >
              <Box sx={{ flex: 1 }}>
                <Typography>Monto Amortización:</Typography>
              </Box>
              <Box sx={{ flex: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  value={venta.montoAmortizacion}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value) || 0;
                    setVenta({
                      ...venta,
                      montoAmortizacion: parseFloat(v.toFixed(2)),
                    });
                  }}
                />
              </Box>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
      {message && (
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Alert
            severity={alertVariant || "info"} // Puede ser "success", "info", "warning", "error"
            onClose={() => setMessage(null)}
          >
            {message}
          </Alert>
        </Stack>
      )}
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAccept}>
          Aceptar
        </Button>
        {/* <Button variant="outlined" color="secondary" onClick={handleReset}>
          Limpiar
        </Button> */}
      </Stack>
    </Container>
  );
};

export default FormEditSale;
