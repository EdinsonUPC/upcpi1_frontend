import axios from "axios";

class RepositoryVentas {
  static instance = null;

  constructor() {
    if (RepositoryVentas.instance) {
      return RepositoryVentas.instance;
    }
    RepositoryVentas.instance = this;
  }

  static getInstance() {
    if (!RepositoryVentas.instance) {
      RepositoryVentas.instance = new RepositoryVentas();
    }
    return RepositoryVentas.instance;
  }

  getToken() {
    const tokenString = localStorage.getItem("user");
    if (!tokenString) {
      throw new Error("Usuario no autenticado");
    }
    const tokenJSON = JSON.parse(tokenString);
    return JSON.stringify(tokenJSON);
  }

  async findVentaCliente(idCliente, idProducto, fecha) {
    const token = this.getToken();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ventas/findVentaCliente`,
        { idCliente, idProducto, fecha, token }
      );
      if (![200, 201].includes(response.status)) {
        throw new Error("Failed to fetch ventas");
      }
      return response.data;
    } catch (err) {
      const msg = `error al consultar api findVentaCliente: ${
        err.message || err
      }`;
      console.error(msg);
      throw new Error(msg);
    }
  }

  async getPrecioVenta(idCliente, idProducto) {
    try {
      const token = this.getToken();
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ventas/get-precio-venta`,
        { idCliente, idProducto, token }
      );
      if (![200, 201].includes(response.status)) {
        throw new Error("Failed to fetch precio de venta");
      }
      const { precio } = response.data;
      if (typeof precio !== "number") {
        throw new Error("La respuesta del API no contiene un precio válido");
      }
      return precio;
    } catch (err) {
      const msg = `Error al consultar API getPrecioVenta: ${
        err.message || err
      }`;
      console.error(msg);
      throw new Error(msg);
    }
  }

  async fetchNotaVentaFromApi(idVenta, fecha, idCliente) {
    const token = this.getToken();
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/ventas/get-nota-venta`,
      { idVenta, fecha, idCliente, token }
    );
    if (![200, 201].includes(response.status)) {
      throw new Error("Failed to fetch nota venta");
    }
    return response.data;
  }

  async fetchAplicarCambioPrecios(recordsWithNewPrices) {
    const token = this.getToken();
    const tokenJSON = JSON.parse(token);
    const params = {
      preciosjson: recordsWithNewPrices,
      source: "WEB",
      idCaja: tokenJSON.idCaja,
      token,
    };
    return axios.post(
      `${import.meta.env.VITE_API_URL}/api/ventas/aplicar-cambio-precios`,
      params
    );
  }

  async fetchAnularDoc(ids) {
    const token = this.getToken();
    return axios.post(`${import.meta.env.VITE_API_URL}/api/ventas/anular-doc`, {
      ids,
      token,
    });
  }

  async fetchCancelarDoc(ids) {
    const token = this.getToken();
    return axios.post(
      `${import.meta.env.VITE_API_URL}/api/ventas/cancelar-doc`,
      { ids, token }
    );
  }

  async fetchCancelarSaldo(ids) {
    const token = this.getToken();
    return axios.post(
      `${import.meta.env.VITE_API_URL}/api/ventas/cancelar-saldo`,
      { ids, token }
    );
  }

  async fetchCreateDocumento(documento) {
    // documento is expected to be an object
    // return axios.post(`${import.meta.env.VITE_API_URL}/documento`, {
    //   documento,
    // });
    return axios.post(`${import.meta.env.VITE_API_URL}/documento/create`, {
      documento,
    });
  }

  async createVenta(dtoVenta) {
    const payload = {
      venta: dtoVenta,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ventas/create`,
        payload
      );
      if (![200, 201].includes(response.status)) {
        throw new Error("Error al procesar la venta: Código inválido");
      }
      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Error inesperado al procesar la venta"
        );
      }
      return response.data;
    } catch (err) {
      console.error("Error en createVenta:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Error al crear la venta");
    }
  }

  async editVenta(dtoVenta) {
    const payload = {
      venta: dtoVenta,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ventas/edit`,
        payload
      );
      if (![200, 201].includes(response.status)) {
        throw new Error("Error al procesar la venta: Código inválido");
      }
      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Error inesperado al procesar la venta"
        );
      }
      return response.data;
    } catch (err) {
      console.error("Error en createVenta:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Error al crear la venta");
    }
  }

  async listarDetalleVenta(fecha, idProducto, idPesador) {
    const token = this.getToken();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ventas/listar-detalle-venta`,
        { fecha, idProducto, idPesador, token }
      );
      if (![200, 201].includes(response.status)) {
        throw new Error("Failed to fetch detalle venta");
      }
      return response.data;
    } catch (err) {
      const msg = `error al consultar api listarDetalleVenta: ${
        err.message || err
      }`;
      console.error(msg);
      throw new Error(msg);
    }
  }

  async eliminarLineaVenta({ intIdVenta, intIdLineaVenta }) {
    const token = this.getToken();
    const tokenJSON = JSON.parse(token);
    const payload = {
      intIdVenta,
      intIdLineaVenta,
      idCaja: tokenJSON.idCaja,
      idPersonal: tokenJSON.idPersonal,
      source: "WEB",
      token,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ventas/eliminar-linea`,
        payload
      );
      if (![200, 201].includes(response.status)) {
        throw new Error("Error al eliminar la línea de venta: Código inválido");
      }
      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Error inesperado al eliminar la línea"
        );
      }
      return response.data;
    } catch (err) {
      console.error(
        "Error en eliminarLineaVenta:",
        err.response?.data || err.message
      );
      throw new Error(
        err.response?.data?.message || "Error al eliminar la línea de venta"
      );
    }
  }
}

const repositoryVentasInstance = RepositoryVentas.getInstance();
Object.freeze(repositoryVentasInstance);
export default repositoryVentasInstance;
