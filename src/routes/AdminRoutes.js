import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompanyInfo from "../Components/CompanyInfo/CompanyInfo";
import MainMenu from "../Components/Menu/Menu";

import Pending from "../Components/Pending/Pending";

const JoinRoutes = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
    { isLoggedIn && <MainMenu /> }
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pending />} />
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default JoinRoutes;
