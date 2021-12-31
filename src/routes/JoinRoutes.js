import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Components/LoginUser/LoginUser";
import Register from "../Components/Register/Register";

const JoinRoutes = () => {
  return (
    <div className="JoinRoutes">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default JoinRoutes;
