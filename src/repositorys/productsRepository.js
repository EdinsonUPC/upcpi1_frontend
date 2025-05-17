import axios from "axios";

class RepositoryProducts {
  static instance = null;
  PRODUCTS_KEY = "products";
  forceFetch = true;

  constructor() {
    if (RepositoryProducts.instance) {
      return RepositoryProducts.instance;
    }
    RepositoryProducts.instance = this;
  }

  static getInstance() {
    if (!RepositoryProducts.instance) {
      RepositoryProducts.instance = new RepositoryProducts();
    }
    return RepositoryProducts.instance;
  }

  setForceFetch(value) {
    this.forceFetch = value;
  }

  getForceFetch() {
    return this.forceFetch;
  }

  async fetchProductsFromApi() {
    const tokenString = localStorage.getItem("user");
    if (!tokenString) {
      throw new Error("Usuario no autenticado");
    }

    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/productos/list"
        // ,
        // {
        //   token: JSON.stringify(tokenJSON.credenciales),
        // }
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(
          "Error al obtener productos: Código de respuesta inválido"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Error en fetchProductsFromApi:", error);
      throw new Error("Error al obtener productos desde la API");
    }
  }

  async getProducts() {
    try {
      const localInformation = localStorage.getItem(this.PRODUCTS_KEY);
      if (localInformation && !this.forceFetch) {
        if (Array.isArray(localInformation)) {
          return localInformation;
        }
        console.warn(
          "Datos inválidos en Local Storage, recargando desde la API"
        );
      }

      const products = await this.fetchProductsFromApi();

      localStorage.setItem(this.PRODUCTS_KEY, products);
      return products;
    } catch (error) {
      console.error("Error en getProducts:", error);
      throw new Error("Error al obtener productos");
    }
  }

  removeProductsFromLocalStorage() {
    try {
      localStorage.removeItem(this.PRODUCTS_KEY);
    } catch (error) {
      console.error("Error al eliminar productos del Local Storage:", error);
      throw new Error("Error al eliminar productos del almacenamiento local");
    }
  }
}

const repositoryProductsInstance = RepositoryProducts.getInstance();
Object.freeze(repositoryProductsInstance);

export default repositoryProductsInstance;
