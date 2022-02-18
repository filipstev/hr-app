import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '../Components/LoginUser/LoginUser';
import Register from '../Components/Register/Register';
import CompanyWall from '../Components/CompanyWall/CompanyWall';
import NotFound from '../Components/NotFound/NotFound';

const JoinRoutes = () => {
    return (
        <div className="JoinRoutes">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route exact path="/join" element={<Register />} />
                    <Route exact path="/join/:slug" element={<Register />} />
                    <Route path="/team/:slug" element={<CompanyWall />} />
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default JoinRoutes;
