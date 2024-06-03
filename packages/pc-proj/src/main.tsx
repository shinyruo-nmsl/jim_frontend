import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./router";
import { UserLoginProvider } from "./context/user";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserLoginProvider>
      <RouterProvider router={Router.router}></RouterProvider>
    </UserLoginProvider>
  </React.StrictMode>
);
