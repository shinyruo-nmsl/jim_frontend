import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { WebContext } from "web-common";
import Router from "@/router";

const {
  User: { UserLoginProvider },
} = WebContext;

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserLoginProvider>
      <RouterProvider router={Router.router}></RouterProvider>
    </UserLoginProvider>
  </React.StrictMode>
);
