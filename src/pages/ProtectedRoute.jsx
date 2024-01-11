import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContex";
import Loader from "../components/Loader";

// ProtectedRoute
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return isLoading ? <><Loader/></> : <>{children}</>;
}


export default ProtectedRoute;
