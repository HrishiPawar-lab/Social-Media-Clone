// ProtectedRoute.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/user-context";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

export default ProtectedRoute;
