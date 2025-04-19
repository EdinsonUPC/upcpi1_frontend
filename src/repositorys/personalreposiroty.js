import axios from "axios";

const PERSONAL_KEY = "personal";
let forceFetch = true; // Estado interno de forceFetch

export const setForceFetch = (value) => {
  forceFetch = value;
};

export const getForceFetch = () => {
  return forceFetch;
};

export const fetchPersonalFromApi = async (personalFilter) => {
  const API_URL = import.meta.env.VITE_API_URL;

  const tokenString = localStorage.getItem("user");
  if (!tokenString) {
    throw new Error("Usuario no autenticado");
  }

  try {
    const tokenJSON = JSON.parse(tokenString);

    const requestBody = {
      source: "Web",
      idCaja: 15928,
      token: JSON.stringify(tokenJSON.credenciales),
      ...personalFilter,
    };

    const response = await axios.post(
      `${API_URL}/api/personal/find`,
      requestBody
    );

    if (response.status !== 200 && response.status !== 201) {
      throw new Error(
        "Error al obtener datos del personal: Código de respuesta inválido"
      );
    }
    const { success, message, data } = response.data;

    if (!success) {
      throw new Error(
        message || "Error desconocido al obtener datos del personal"
      );
    }

    return data;
  } catch (error) {
    throw new Error("Error al obtener datos del personal desde la API");
  }
};

export const filterPersonalData = (data, personalFilter) => {
  if (!personalFilter || Object.keys(personalFilter).length === 0) {
    return data;
  }

  return data.filter((item) => {
    return Object.entries(personalFilter).every(
      ([key, value]) => item[key] === value
    );
  });
};

export const getPersonal = async (personalFilter) => {
  try {
    const localInformation = localStorage.getItem(PERSONAL_KEY);
    if (localInformation && !forceFetch) {
      const storedPersonal = JSON.parse(localInformation);
      if (Array.isArray(storedPersonal)) {
        return filterPersonalData(storedPersonal, personalFilter);
      }
    }

    const personalData = await fetchPersonalFromApi(personalFilter);

    // Guardar datos en Local Storage
    localStorage.setItem(PERSONAL_KEY, JSON.stringify(personalData));
    return personalData;
  } catch (error) {
    throw new Error("Error al obtener datos del personal");
  }
};

export const removePersonalFromLocalStorage = () => {
  try {
    localStorage.removeItem(PERSONAL_KEY);
  } catch (error) {
    throw new Error("Error al eliminar datos del almacenamiento local");
  }
};
