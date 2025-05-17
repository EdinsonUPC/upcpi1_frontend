import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/dashboard";
import Products from "./pages/products";
import ProductDetail from "./pages/productDetail";
import TableroReporte from "./pages/tableroReporte";
import VentasListadoMUI from "./pages/mantenimientoVenta";
import SaleDetail from "./pages/saleDetail";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Rutas protegidas dentro del layout con menú */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ProductDetail />} />
              <Route path="/sales/:saleId" element={<SaleDetail />} />
              <Route
                path="/ventas/tablero-reporte"
                element={<TableroReporte />}
              />
              <Route
                path="ventas/mantenimiento"
                element={<VentasListadoMUI />}
              />
              {/* Aquí puedes añadir más rutas protegidas */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
