import axios from "axios";

class RepositoryParametros {
  static instance = null;
  PARAMETRO_KEY = "parametro";

  constructor() {
    if (RepositoryParametros.instance) {
      return RepositoryParametros.instance;
    }
    RepositoryParametros.instance = this;
  }

  static getInstance() {
    if (!RepositoryParametros.instance) {
      RepositoryParametros.instance = new RepositoryParametros();
    }
    return RepositoryParametros.instance;
  }

  async fetchParametroFromApi() {
    const tokenString = localStorage.getItem("user");
    if (!tokenString) {
      throw new Error("Usuario no autenticado");
    }
    const tokenJSON = JSON.parse(tokenString);

    const requestBody = {
      token: JSON.stringify(tokenJSON.credenciales),
    };

    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/api/parametro-detalle/find",
      requestBody
    );

    if (response.status !== 200 && response.status !== 201) {
      throw new Error(
        "Error al obtener datos de parametros: Código de respuesta inválido"
      );
    }

    const { success, message, data } = response.data;
    if (!success) {
      throw new Error(
        message || "Error desconocido al obtener datos de parametros"
      );
    }

    return data;
  }

  async getParametro() {
    try {
      const stored = localStorage.getItem(this.PARAMETRO_KEY);

      const parsed = stored ? JSON.parse(stored) : null;

      if (!parsed) {
        const apiData = await this.fetchParametroFromApi();
        console.log("apiData");
        console.log(apiData);
        localStorage.setItem(this.PARAMETRO_KEY, JSON.stringify(apiData));
        return apiData;
      }
      return parsed;
    } catch (error) {
      console.error("Error en getParametro:", error);
      throw new Error("Error al obtener datos de parametro");
    }
  }

  async setParametro() {
    try {
      const apiData = await this.fetchParametroFromApi();

      localStorage.setItem(this.PARAMETRO_KEY, apiData);
    } catch (error) {
      console.error("Error en setParametro:", error);
      throw new Error("Error al obtener datos de parametro");
    }
  }

  removeParametroFromLocalStorage() {
    try {
      localStorage.removeItem(this.PARAMETRO_KEY);
      console.log("Datos de parametro eliminados del Local Storage");
    } catch (error) {
      console.error(
        "Error al eliminar datos de parametro del Local Storage:",
        error
      );
      throw new Error("Error al eliminar datos del almacenamiento local");
    }
  }

  getParametroValor(nombreParametro) {
    try {
      const stored = localStorage.getItem(this.PARAMETRO_KEY);
      if (!stored) {
        console.warn(
          "No se encontraron parametros en el almacenamiento local."
        );
        return "";
      }
      const parametroData = JSON.parse(stored);
      const found = parametroData.find(
        (item) => item.Texto === nombreParametro
      );
      return found ? found.Valor : "";
    } catch (error) {
      console.error("Error en RepositoryParametros getParametroValor", error);
      return "";
    }
  }
}

const repositoryParametroInstance = RepositoryParametros.getInstance();
Object.freeze(repositoryParametroInstance);

export default repositoryParametroInstance;
