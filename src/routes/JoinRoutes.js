import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../Components/LoginUser/LoginUser';
import Register from '../Components/Register/Register';
import CompanyWall from '../Components/CompanyWall/CompanyWall';

const JoinRoutes = () => {
    return (
        <div className="JoinRoutes">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route
                        exact
                        path="/register/:slug"
                        element={<Register />}
                    />
                    <Route path="/team/:slug" element={<CompanyWall />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default JoinRoutes;
