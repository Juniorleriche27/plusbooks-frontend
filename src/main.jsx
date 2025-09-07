import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

import Home from "./pages/Home";
import Ebooks from "./pages/Ebooks";
import EbookDetail from "./pages/EbookDetail";
import EbookCreate from "./pages/EbookCreate";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";

import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/base.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />

          <Route path="ebooks" element={<Ebooks />} />
          <Route path="ebooks/:id" element={<EbookDetail />} />
          <Route
            path="ebooks/new"
            element={
              <ProtectedRoute>
                <EbookCreate />
              </ProtectedRoute>
            }
          />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* ✅ Ajout des pages publiques */}
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
