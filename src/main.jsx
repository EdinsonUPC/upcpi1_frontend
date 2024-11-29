import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Dashboard from "./pages/dashboard";
// import EnhancedTable from "./products/table";
// import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
  Outlet,
  // createRoutesFromElements,
} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./ErrorPage";
import Products from "./pages/products";
import ProductDetail from "./pages/productDetail";

// const AppLayout = () => (
//   <>
//     {/* <Navbar /> */}
//     <Outlet />
//   </>
// );

// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     children: [
//       {
//         path: "/",
//         element: <Dashboard />,
//       },
//       {
//         path: "products",
//         element: <Products />,
//       },
//       {
//         path: "reports",
//         element: <ProductDetail />,
//       },
//     ],
//   },
// ]);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product/:productId",
        element: <ProductDetail />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Dashboard /> */}
    {/* <Products /> */}
    {/* <ProductDetail /> */}
    {/* <EnhancedTable /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
