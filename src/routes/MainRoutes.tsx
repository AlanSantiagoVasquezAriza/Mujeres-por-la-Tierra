import { RouteObject } from "react-router-dom";
import App from "../App";
import { Foro } from "../components";

export const MainRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/foro",
    element: <Foro />,
  },
];
