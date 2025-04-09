import { RouteObject } from "react-router-dom";
import App from "../App";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Register } from "../pages/Register";

export const MainRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/foro",
    element: <App />,
  },

  {
    path: "/register",
    element: <Register />,
  },
];
