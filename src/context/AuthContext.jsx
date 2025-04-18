import { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (username, password, company) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/users/sign-in",
        {
          username,
          password,
          empresa: company,
        }
      );

      if (data.success === false) {
        return {
          auth: false,
          message: data.message,
        };
      }
      const userData = {
        username: data.username,
        empresa: data.empresa,
        idCaja: data.idCaja,
        idPersonal: data.idPersonal,
        tokenjwt: data.tokenjwt,
        personalParams: data.personalParams,
      };

      setUser(userData);

      localStorage.setItem("user", JSON.stringify(userData));

      return {
        auth: true,
        message: "",
      };
    } catch (error) {
      console.error("Error en el login:", error);
      return {
        auth: false,
        message: "Error en el login:",
      };
    }
  };

  // 4. Función de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // 5. Proveer el contexto
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
