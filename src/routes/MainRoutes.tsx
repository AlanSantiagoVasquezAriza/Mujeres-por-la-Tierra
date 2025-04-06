import { RouteObject } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import Home from "../pages/home";
import Register from "../pages/registrer";



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
    path: "/foros",
    element: <App />,

  },

  {
    path: "/registrer",
    element: <Register />,

  },

];
