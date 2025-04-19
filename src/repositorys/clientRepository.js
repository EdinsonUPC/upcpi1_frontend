import axios from "axios";

class RepositoryClients {
  static instance = null;
  CLIENTS_KEY = "clients";

  constructor() {
    if (RepositoryClients.instance) {
      return RepositoryClients.instance;
    }
    RepositoryClients.instance = this;
  }

  static getInstance() {
    if (!RepositoryClients.instance) {
      RepositoryClients.instance = new RepositoryClients();
    }
    return RepositoryClients.instance;
  }

  async fetchClientsFromApi() {
    const tokenString = localStorage.getItem("user");
    if (!tokenString) {
      throw new Error("Usuario no autenticado");
    }
    const tokenJSON = JSON.parse(tokenString);

    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/api/clientes/find",
      { token: JSON.stringify(tokenJSON.credenciales) }
    );

    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Failed to fetch clients");
    }

    return response.data;
  }

  async getClients(forceFetch = true) {
    const localInformation = localStorage.getItem(this.CLIENTS_KEY);
    if (localInformation && !forceFetch) {
      return localInformation;
    }
    const clients = await this.fetchClientsFromApi();
    localStorage.setItem(this.CLIENTS_KEY, clients);
    return clients;
  }
}

const repositoryClientsInstance = RepositoryClients.getInstance();
Object.freeze(repositoryClientsInstance);

export default repositoryClientsInstance;
