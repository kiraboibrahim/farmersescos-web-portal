import FarmerList from "../components/FarmerList/FarmerList";
import {
  AllProductList,
  EscoProductList,
} from "../components/ProductList/Product.List";
import EscoList from "../components/EscoList/EscoList";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../components/Main/Main";
import FarmerDetail from "../components/FarmerDetail/FarmerDetail";
import EscoDetail from "../components/EscoDetail/EscoDetail";
import InterestList from "../components/InterestList/InterestList";
import FarmerProfile from "../components/FarmerProfile/FarmerProfile";
import EscoProfile from "../components/EscoProfile/EscoProfile";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import FarmerInstallationList, {
  EscoInstallationList,
} from "../components/InstallationList/InstallationList";
import Login from "../components/Login/Login";
import SuperAdminRequired from "../components/SuperAdminRequired/SuperAdminRequired";
import {
  EscoOfferList,
  FarmerOfferList,
} from "../components/OfferList/OfferList";
import { FarmerRecommendationList } from "../components/FarmerRecommendationList/FarmerRecommendationList";

const routes = [
  {
    path: "/",
    element: (
      <SuperAdminRequired>
        <Main />
      </SuperAdminRequired>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/products" />,
      },
      {
        path: "products",
        element: <AllProductList />,
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
          {
            path: "installations",
            element: <FarmerInstallationList />,
          },
          {
            path: "offers",
            element: <FarmerOfferList />,
          },
          {
            path: "recommendations",
            element: <FarmerRecommendationList />,
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
          {
            path: "products",
            element: <EscoProductList />,
          },
          {
            path: "installations",
            element: <EscoInstallationList />,
          },
          {
            path: "offers",
            element: <EscoOfferList />,
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
  {
    path: "/login",
    element: <Login />,
  },
];

const router = createBrowserRouter([...routes], {
  basename: "/farmersescos-web-portal/",
});
export default router;
