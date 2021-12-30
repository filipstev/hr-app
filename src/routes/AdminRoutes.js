import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompanyInfo from '../Components/CompanyInfo/CompanyInfo';
import MainMenu from '../Components/Menu/Menu';

import Pending from '../Components/Pending/Pending';
import AddQuestion from '../Components/Questions/AddQuestion/AddQuestion';
import Questions from '../Components/Questions/Questions';
import Header from '../Components/Header/Header';
import EditQuestion from '../Components/Questions/EditQuestion/EditQuestion';
// Fix Header and MainMenu
const JoinRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <MainMenu />
        <Routes>
          <Route path="/" element={<CompanyInfo />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/company-info" element={<CompanyInfo />} />
          <Route path="/new-question" element={<AddQuestion />} />
          <Route path="/edit-question" element={<EditQuestion />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default JoinRoutes;
