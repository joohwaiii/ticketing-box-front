import Login from "admin/Login";
import Setting from "admin/Setting";
import { setInitAxioSetting } from "api/api";
import Main from "main/Main";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

const App = () => {
  setInitAxioSetting();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/setting" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
