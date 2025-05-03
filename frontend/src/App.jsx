import React from "react";
import "./globals.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/home/Home";

import { Toaster } from "react-hot-toast";
import OtpVerificationPage from "./pages/auth/OTP";
import Friends from "./components/home/friends/Friends";
const App = () => {
  return (
    <>
      <Router>
        <Toaster />
        <Routes>
          {/* auth routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<OtpVerificationPage />} />
          {/* home routes */}

          <Route path="/home" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
