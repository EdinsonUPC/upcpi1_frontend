import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuth();
  return user ? (
    <Outlet /> // Renderiza rutas hijas: /dashboard, /profile, etc.
  ) : (
    <Navigate to="/" replace />
  ); // Redirige a login si no está autenticado
};

export default ProtectedRoute;
