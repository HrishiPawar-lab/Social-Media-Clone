// App.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Register from "./components/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Login from "./pages/Login/Login";

function App() {
  // Check if the token is present in localStorage
  const Auth = localStorage.getItem("token") !== null;
  const [isLogged, setIsLogged] = useState(Auth);

  const handleLocalStorage = (value) => {
    setIsLogged(value);
  };

  return (
    <div>
      <Topbar isLogged={isLogged} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute isLogged={isLogged}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={<Login handleLocalStorage={handleLocalStorage} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile/:userID"
          element={
            <ProtectedRoute isLogged={isLogged}>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
