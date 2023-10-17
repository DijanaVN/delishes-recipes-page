import { createBrowserRouter } from "react-router-dom";

import Layout from "./Layout";
import HomePage from "./HomePage";
import ErrorPage from "./ErrorPage";
import NutritionDitails from "./../components/NutritionDetails";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/details", element: <NutritionDitails /> },
    ],
  },
]);

export default router;
