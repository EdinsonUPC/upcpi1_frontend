import moment from "moment-timezone";
moment.tz.setDefault("UTC");

const dtoVenta = () => ({
  IdVenta: 0,
  NombreVenta: "",
  IdTipoDocumentoVenta: "",
  TipoDocumentoVenta: "BOL",
  NumeroDocumento: "",
  Precio: 0,
  MontoSubTotal: 0,
  MontoIGV: 0,
  MontoTotal: 0,
  EsSobrante: false,
  TotalPesoBruto: 0,
  TotalPesoTara: 0,
  TotalPesoNeto: 0,
  TieneDevolucion: "N",
  TotalDevolucion: 0,
  TotalAmortizacion: 0,
  TotalSaldo: 0,
  Observacion: "",
  ClienteEventual: "",
  IdEstado: "REG",
  IdCaja: 0,
  IdEmpresa: 1,
  Empresa: "",
  IdProducto: 0,
  Producto: "",
  IdCliente: 0,
  Cliente: "",
  ListaLineaVenta: [],
  ListaAmortizacion: [],
  FechaCreacion: new Date(),
  TotalUnidades: 0,
  fecha: moment()
    .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
    .format("YYYY-MM-DD"),
  IdPesador: 0,
  tipoTransaccion: "",
  idTipoDocumento: "0",
  idFormaPago: "EFE",
  idBanco: "",
  montoAmortizacion: 0,
});

export default dtoVenta;
