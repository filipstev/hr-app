import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompanyInfo from '../Components/CompanyInfo/CompanyInfo';

import Pending from '../Components/Pending/Pending';

const JoinRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pending />} />
      </Routes>
    </BrowserRouter>
  );
};

export default JoinRoutes;
