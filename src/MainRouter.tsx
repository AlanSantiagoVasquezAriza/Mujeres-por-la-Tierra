import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainRoutes } from "./routes/MainRoutes";
import { useEffect } from "react";

const router = createBrowserRouter(MainRoutes);

export const MainRouter = () => {
  useEffect(() => {}, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
