import React from "react";
import "./globals.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/home/Home";

import { Toaster } from "react-hot-toast";
import OtpVerificationPage from "./pages/auth/OTP";
import Friends from "./components/home/friends/Friends";
import Feeds from "./components/home/Feeds/Feeds";
import Profile from "./Profiles/Profile";
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
          <Route path="/profile" element={<Profile />} />

          {/* home routes */}

          <Route path="/home" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/feeds" element={<Feeds />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
