import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react"
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;