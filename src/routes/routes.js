import { lazy } from "react";
import { lazily } from "react-lazily";
import FarmerList from "../components/FarmerList/FarmerList";
import { AllProductList } from "../components/ProductList/Product.List";
import EscoList from "../components/EscoList/EscoList";
import GroupList from "../components/GroupList/GroupList";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../components/Main/Main";
import Login from "../components/Login/Login";
import SuperAdminRequired from "../components/SuperAdminRequired/SuperAdminRequired";
import {
  EscoOfferList,
  FarmerOfferList,
} from "../components/OfferList/OfferList";
import { FarmerRecommendationList } from "../components/FarmerRecommendationList/FarmerRecommendationList";
import GroupProfile from "../components/GroupProfile/GroupProfile";
import { Suspense } from "react";
import Loading from "../components/common/utils/Loading";
import GroupDetail from "../components/GroupDetail/GroupDetail";
const FarmerDetail = lazy(() =>
  import("../components/FarmerDetail/FarmerDetail")
);
const EscoDetail = lazy(() => import("../components/EscoDetail/EscoDetail"));
const { EscoProductList } = lazily(() =>
  import("../components/ProductList/Product.List")
);
const InterestList = lazy(() =>
  import("../components/InterestList/InterestList")
);
const FarmerProfile = lazy(() =>
  import("../components/FarmerProfile/FarmerProfile")
);
const EscoProfile = lazy(() => import("../components/EscoProfile/EscoProfile"));
const ProductDetail = lazy(() =>
  import("../components/ProductDetail/ProductDetail")
);
const { FarmerInstallationList, EscoInstallationList } = lazily(() =>
  import("../components/InstallationList/InstallationList")
);
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
        element: (
          <Suspense fallback={<Loading />}>
            <FarmerDetail />
          </Suspense>
        ),
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
        element: (
          <Suspense fallback={<Loading />}>
            <EscoDetail />
          </Suspense>
        ),
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
        path: "groups",
        element: <GroupList />,
      },
      {
        path: "/groups/:id",
        element: <GroupDetail />,
        children: [
          {
            element: <GroupProfile />,
            index: true,
          },
          {
            path: "profile",
            element: <GroupProfile />,
          },
        ],
      },
      {
        path: "products/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ProductDetail />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/farmers/:id",
    element: (
      <Suspense fallback={<Loading />}>
        <FarmerDetail />
      </Suspense>
    ),
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
