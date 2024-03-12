// App.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Register from "./components/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Login from "./pages/Login/Login";
import { useUserContext } from "./context/user-context";

function App() {
  const context = useUserContext();

  return (
    <div>
      <Topbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute >
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile/:userID"
          element={
            <ProtectedRoute >
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
