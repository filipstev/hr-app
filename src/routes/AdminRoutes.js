import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompanyInfo from '../Components/CompanyInfo/CompanyInfo';

import Pending from '../Components/Pending/Pending';
import AddQuestion from '../Components/Questions/AddQuestion/AddQuestion';
import Questions from '../Components/Questions/Questions';

const JoinRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CompanyInfo />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/company" element={<CompanyInfo />} />
        <Route path="/new-question" element={<AddQuestion />} />
      </Routes>
    </BrowserRouter>
  );
};

export default JoinRoutes;
