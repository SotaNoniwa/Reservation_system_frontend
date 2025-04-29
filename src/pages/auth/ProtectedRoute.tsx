import { jwtDecode } from "jwt-decode";
import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import { JwtPayload } from "../../types/JwtPayload";

const ProtectedRoute = ({
  children,
  requiredRole,
}: {
  children: JSX.Element;
  requiredRole: string;
}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  try {
    // Decode the token and check for the required role
    const decodedToken = jwtDecode<JwtPayload>(token);
    const userRoles = decodedToken.roles.map((role) => role.name);
    const isExpired = Date.now() >= decodedToken.exp * 1000;

    if (isExpired) {
      localStorage.removeItem("token");
      return <Navigate to="/auth/login" replace />;
    }

    if (!userRoles.includes(requiredRole)) {
      alert("You do not have permission to access this page.");
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    console.error("Error decoding token: ", error);
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
