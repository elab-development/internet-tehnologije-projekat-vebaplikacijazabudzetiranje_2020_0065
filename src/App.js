import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import React, { Component } from "react";

import GlavnaStrana from "./pages/GlavnaStrana";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";

function App() {
  return (
    //komponente koje ce se uvek prikazati
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GlavnaStrana />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
