import React from "react";
import "./globals.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/home/Home";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* auth routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* home routes */}

          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
