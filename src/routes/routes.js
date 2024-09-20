import FarmerList from "../components/FarmerList/FarmerList";
import ProductList from "../components/ProductList/Product.List";
import EscoList from "../components/EscoList/EscoList";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Nav from "../components/Nav/Nav";
import FarmerDetail from "../components/FarmerDetail/FarmerDetail";
import EscoDetail from "../components/EscoDetail/EscoDetail";
import InterestList from "../components/InterestList/InterestList";
import FarmerProfile from "../components/FarmerProfile/FarmerProfile";
import EscoProfile from "../components/EscoProfile/EscoProfile";
import ProductDetail from "../components/ProductDetail/ProductDetail";

const routes = [
  {
    path: "/",
    element: <Nav />,
    children: [
      {
        index: true,
        element: <Navigate to="/products" />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "farmers",
        element: <FarmerList />,
      },
      {
        path: "/farmers/:id",
        element: <FarmerDetail />,
        children: [
          {
            index: true,
            element: <FarmerProfile />,
          },
          {
            path: "interests",
            element: <InterestList />,
          },
          {
            path: "profile",
            element: <FarmerProfile />,
          },
        ],
      },
      {
        path: "escos",
        element: <EscoList />,
      },
      {
        path: "/escos/:id",
        element: <EscoDetail />,
        children: [
          {
            index: true,
            element: <EscoProfile />,
          },
          {
            path: "profile",
            element: <EscoProfile />,
          },
        ],
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: "/farmers/:id",
    element: <FarmerDetail />,
  },
];

const router = createBrowserRouter([...routes]);
export default router;
