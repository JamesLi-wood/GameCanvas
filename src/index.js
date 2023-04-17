import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.js";
import Login from "./pages/login.js";
import GameInfo from "./pages/gameInfo.js";
import SignUp from "./pages/signUp.js";
import Browse from "./pages/browse.js";
import { RouterProvider, createHashRouter } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "gameInfo",
    element: <GameInfo />,
  },
  {
    path: "signUp",
    element: <SignUp />,
  },
  {
    path: "browse",
    element: <Browse />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
