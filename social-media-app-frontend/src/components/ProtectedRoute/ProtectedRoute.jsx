// ProtectedRoute.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, isLogged }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/login", { replace: true });
    }
  }, [isLogged, navigate]);

  return (
    <React.Fragment key={isLogged ? "protected" : "unprotected"}>
      {children}
    </React.Fragment>
  );
};

export default ProtectedRoute;
