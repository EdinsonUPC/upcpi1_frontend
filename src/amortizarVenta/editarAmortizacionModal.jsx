import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Stack,
  TextField,
  FormLabel,
} from "@mui/material";
import DdownSearchParametro from "../components/DdownSearchParametro";
import moment from "moment";
// import DdownSearchParametro from "./DdownSearchParametro"; // Asegúrate de tener este componente

const EditarAmortizacionModal = ({
  idVenta,
  sale,
  amortizaciones,
  amortizacionEdit,
  handleSubmit,
  open,
  onClose,
}) => {
  const [amortizacion, setAmortizacion] = useState({
    Monto: 0,
    IdFormaPago: "",
    FechaPago: "",
    IdTipoAmortizacion: "0",
    Observacion: "",
    IdEstado: "REG",
    IdBanco: "",
    NumeroRecibo: "",
    Id_Venta: idVenta,
    Cliente: `${sale?.Id_Cliente} / ${sale?.Cliente}`,
  });

  useEffect(() => {
    const montoAmortizado = amortizaciones?.reduce(
      (acumulador, valorActual) => {
        if (valorActual.IdEstado === "ANL") return acumulador;
        return acumulador + valorActual.Monto;
      },
      0
    );

    setAmortizacion((x) => ({
      ...x,
      Cliente: `${sale?.Id_Cliente} / ${sale?.Cliente}`,
      MontoRestante: sale?.Monto_Total - montoAmortizado,
    }));
  }, [sale, amortizaciones]);

  const tipoPagoRef = useRef();
  const formaPagoRef = useRef();
  const bancoRef = useRef();

  const setDefaultRefs = (x) => {
    console.log("setDefaultRefs");
    console.log(x);
    tipoPagoRef.current?.setOption(x.IdTipoAmortizacion);
    formaPagoRef.current?.setOption(x.IdFormaPago);
    bancoRef.current?.setOption(x.IdBanco);
  };

  const resetearRefs = () => {
    tipoPagoRef.current?.reset();
    formaPagoRef.current?.reset();
    bancoRef.current?.reset();
  };

  useEffect(() => {
    if (amortizacionEdit) {
      setAmortizacion((x) => ({
        ...x,
        ...amortizacionEdit,
        FechaPago: moment(amortizacionEdit?.FechaPago).format("YYYY-MM-DD"),
      }));
    }
  }, [amortizacionEdit]);

  useEffect(() => {
    console.log("amortizacionEdit");
    console.log(amortizacionEdit);
    if (!amortizacionEdit) return;

    const timeout = setTimeout(() => {
      if (tipoPagoRef.current && formaPagoRef.current && bancoRef.current) {
        setDefaultRefs({
          IdTipoAmortizacion: amortizacionEdit?.IdTipoAmortizacion,
          IdFormaPago: amortizacionEdit?.IdFormaPago,
          IdBanco: amortizacionEdit?.IdBanco,
        });
      }
    }, 50); // 50ms suele ser suficiente

    return () => clearTimeout(timeout);
  }, [amortizacionEdit]);

  const handleChangeDdown = (data) => {
    setAmortizacion((prevData) => ({ ...prevData, [data.name]: data.value }));
  };

  const handleModalSubmit = () => {
    handleSubmit(amortizacion);
  };

  const handleFechaChange = (newFecha) => {
    setAmortizacion((prev) => ({ ...prev, FechaPago: newFecha }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Modificar Amortización</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          {/* Fila: Tipo y Forma de Pago */}
          <Stack direction={"column"} spacing={2}>
            <Stack spacing={1} flex={1}>
              <FormLabel>Id Venta</FormLabel>
              <TextField
                type="text"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                variant="outlined"
                size="small"
                value={amortizacion.Id_Venta}
              />
            </Stack>
            <Stack spacing={1} flex={1}>
              <FormLabel>Cliente</FormLabel>
              <TextField
                type="text"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                variant="outlined"
                size="small"
                value={amortizacion.Cliente}
              />
            </Stack>
            <Stack spacing={1} flex={1}>
              <FormLabel>Fecha</FormLabel>
              <TextField
                fullWidth
                type="date"
                size="small"
                value={amortizacion.FechaPago}
                onChange={(e) => handleFechaChange(e.target.value)}
              />
            </Stack>
            <Stack spacing={1} flex={1}>
              <FormLabel>Monto Restante</FormLabel>
              <TextField
                type="text"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                variant="outlined"
                size="small"
                value={amortizacion?.MontoRestante}
              />
            </Stack>

            <Stack spacing={1} flex={1}>
              <FormLabel>Observación</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                size="small"
                value={amortizacion.Observacion}
                onChange={(e) =>
                  setAmortizacion((x) => ({
                    ...x,
                    Observacion: e.target.value,
                  }))
                }
              />
            </Stack>
            <Stack spacing={1}>
              <FormLabel>Tipo de Pago:</FormLabel>
              <Box width={{ xs: "100%" }}>
                <DdownSearchParametro
                  ref={tipoPagoRef}
                  // selectedValue={amortizacion.IdTipoAmortizacion}
                  onChange={handleChangeDdown}
                  name="IdTipoAmortizacion"
                  idParametro={8}
                />
              </Box>
            </Stack>
            <Stack spacing={1}>
              <FormLabel>Forma de Pago:</FormLabel>
              <Box width={{ xs: "100%" }}>
                <DdownSearchParametro
                  ref={formaPagoRef}
                  // selectedValue={amortizacion.IdFormaPago}
                  onChange={handleChangeDdown}
                  name="IdFormaPago"
                  idParametro={7}
                  // notInit={true}
                  filtroParametroDetallePadre={amortizacion.IdTipoAmortizacion}
                />
              </Box>
            </Stack>
            {["DEP", "DET", "CHQ"].includes(amortizacion.IdFormaPago) && (
              <>
                <Stack spacing={1}>
                  <FormLabel>Banco:</FormLabel>
                  <Box width={{ xs: "100%" }}>
                    <DdownSearchParametro
                      ref={bancoRef}
                      // selectedValue={amortizacion.idBanco}
                      onChange={handleChangeDdown}
                      name="IdBanco"
                      idParametro={11}
                    />
                  </Box>
                </Stack>
                <Stack spacing={1}>
                  <FormLabel>Nro Operación:</FormLabel>
                  <Box width={{ xs: "100%" }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Ingrese el nro operación"
                      value={amortizacion.NumeroRecibo}
                      onChange={(e) =>
                        setAmortizacion({
                          ...amortizacion,
                          NumeroRecibo: e.target.value,
                        })
                      }
                    />
                  </Box>
                </Stack>
              </>
            )}
            <Stack spacing={1}>
              <FormLabel>Monto Amortización:</FormLabel>
              <Box width={{ xs: "100%" }}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  value={amortizacion.Monto}
                  onChange={(e) => {
                    // const v = parseFloat(e.target.value) || 0;
                    setAmortizacion({
                      ...amortizacion,
                      Monto: e.target.value,
                    });
                  }}
                />
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleModalSubmit} color="primary" variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarAmortizacionModal;
