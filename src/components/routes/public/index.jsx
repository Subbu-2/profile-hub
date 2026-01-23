import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../../../api/client";

const PublicRoute = ({ children }) => {
  const token = getToken();
  if (token) return <Navigate to="/welcome" replace />;
  return children;
};

export default PublicRoute;
