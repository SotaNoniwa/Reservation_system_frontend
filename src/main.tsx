import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import UserHome from "./pages/user/Home";
import AvailableTimeSlotForm from "./pages/admin/AvailableTimeSlotForm";
import NotFound from "./pages/NotFound";
import ReservationForm from "./pages/user/ReservationForm";
import AdminHome from "./pages/admin/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute requiredRole="ROLE_USER">
        <UserHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/reservation-form",
    element: (
      <ProtectedRoute requiredRole="ROLE_USER">
        <ReservationForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="ROLE_ADMIN">
        <AdminHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/available-time-slot-form",
    element: (
      <ProtectedRoute requiredRole="ROLE_ADMIN">
        <AvailableTimeSlotForm />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
