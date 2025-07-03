import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
  requiredRole?: number;
}

const ProtectedRoute: React.FC<Props> = ({ children, requiredRole }) => {
  const { user, isAuthReady } = useAuth();

  if (!isAuthReady) return null;

  if (!user) return <Navigate to="/login" />;
  if (requiredRole && user.roleID !== requiredRole)
    return <Navigate to="/unauthorized" />;

  return <>{children}</>;
};

export default ProtectedRoute;
