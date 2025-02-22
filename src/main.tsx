import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import UserHome from "./pages/user/Home";
import AvailableTimeSlotForm from "./pages/admin/AvailableTimeSlotForm";
import NotFound from "./pages/NotFound";
import ReservationForm from "./pages/user/ReservationForm";
import AdminHome from "./pages/admin/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/user",
    element: <UserHome />,
  },
  {
    path: "/user/reservation-form",
    element: <ReservationForm />,
  },
  {
    path: "/admin",
    element: <AdminHome />,
  },
  {
    path: "/admin/available-time-slot-form",
    element: <AvailableTimeSlotForm />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
