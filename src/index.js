import App from "./pages/App.js";
import Login from "./pages/login.js";
import GameInfo from "./pages/gameInfo.js";
import SignUp from "./pages/signUp.js";
import Browse from "./pages/browse.js";
import Genre from "./pages/genre.js";
import Profile from "./pages/profile.js";
import Home from "./pages/home.js";
import ProfileList from "./pages/profileList.js";
import { RouterProvider, createHashRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";

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
  {
    path: "genre",
    element: <Genre />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "profileList",
    element: <ProfileList />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
