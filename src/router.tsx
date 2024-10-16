import { createBrowserRouter } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import ErrorPage from "./components/ErrorPage";
import Layout from "./components/Layout/Index";
import DashboardComponent from "./components/pages/DashboardComponent";
import ProductComponent from "./components/products/ProductComponent";
import LoginComponent from "./components/pages/LoginComponent";
import ProtectedRoute from "./components/ProtectedRoute";
import CategoriesComponent from "./components/category/CategoriesComponent";
import SaleComponent from "./components/sales/SaleComponent";

export const ROOT = "/";
export const PREFIX = "/admin";
export const LOGIN = "/login";
export const DASHBOARD = "/admin/dashboard";
export const PRODUCTs = "/admin/products";
export const CATEGORIES = "/admin/categories";
export const POSSALE = "/admin/make/sale";

const router = createBrowserRouter([
  {
    path: ROOT,
    element: <HomeComponent />,
    errorElement: <ErrorPage />,
  },
  {
    path: LOGIN,
    element: <LoginComponent />,
  },
  {
    path: PREFIX,
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: DASHBOARD,
        element: <DashboardComponent></DashboardComponent>,
      },
      {
        path: PRODUCTs,
        element: <ProductComponent></ProductComponent>,
      },
      {
        path: CATEGORIES,
        element: <CategoriesComponent></CategoriesComponent>,
      },
      {
        path: POSSALE,
        element: <SaleComponent></SaleComponent>,
      },
    ],
  },
]);

export default router;
