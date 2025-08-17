import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Login from "../screen/Auth/Login";
import Register from "../screen/Auth/Register";
import MainLayout from "../layout/MainLayout";
import Home from "../screen/Main/Home";
import AdminHome from "../screen/Admin/Home";
import Product from "../screen/Main/Product";
import Cart from "../screen/Main/Cart";
import AdminLayout from "../layout/AdminLayout";
import AdminProduct from "../screen/Admin/Product";
import ProtectiveComponent from "../components/ProtectiveComponent";

const router = createBrowserRouter([{
  path: "/",
  element: <AuthLayout />,
  children: [{
    path: "",
    index: true,
    element: <Login />
  },
  {
    path: "register",
    element: <Register />
  }]
},
{
  path: "/main",
  element: <ProtectiveComponent><MainLayout /></ProtectiveComponent>,
  children: [{
    index: true,
    element: <Home />
  },
  {
    path: "product/:id",
    element: <Product />
  },
  {
    path: "cart",
    element: <Cart />
  }]
},
{
  path: "/admin",
  element: <ProtectiveComponent><AdminLayout /></ProtectiveComponent>,
  children: [{
    path: "",
    index: true,
    element: <AdminHome />
  },
  {
    path: "product/:id",
    element: <AdminProduct />
  }]
}
]);

export default function AppRouter() {
  return <RouterProvider router={router} />
}




