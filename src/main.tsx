import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "normalize.css";
import { Provider } from "react-redux";
import "@/css/index.less";
import routes from "./router";
import store from "./store";
import "./index.css";
import React from "react";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
