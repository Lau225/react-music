import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import App from "@/App";
const Discover = lazy(() => import("@/views/discover"));
const Download = lazy(() => import("@/views/download"));
const Mine = lazy(() => import("@/views/mine"));
const Focus = lazy(() => import("@/views/focus"));
const Recommend = lazy(() => import("@/views/discover/c-views/recommend"));
const Ranking = lazy(() => import("@/views/discover/c-views/ranking"));
const Djradio = lazy(() => import("@/views/discover/c-views/djradio"));
const Singer = lazy(() => import("@/views/discover/c-views/singer"));
const Song = lazy(() => import("@/views/discover/c-views/songs"));
const New = lazy(() => import("@/views/discover/c-views/new"));
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/discover/recommend" />,
      },
      {
        path: "/discover",
        element: <Discover />,
        children: [
          {
            path: "/discover",
            element: <Navigate to="/discover/recommend" />,
          },
          {
            path: "/discover/recommend",
            element: <Recommend />,
          },
          {
            path: "/discover/ranking",
            element: <Ranking />,
          },
          {
            path: "/discover/djradio",
            element: <Djradio />,
          },
          {
            path: "/discover/singer",
            element: <Singer />,
          },
          {
            path: "/discover/songs",
            element: <Song />,
          },
          {
            path: "/discover/new",
            element: <New />,
          },
        ],
      },
      {
        path: "/focus",
        element: <Focus />,
      },
      {
        path: "/mine",
        element: <Mine />,
      },
      {
        path: "/download",
        element: <Download />,
      },
    ],
  },
]);

export default routes;
