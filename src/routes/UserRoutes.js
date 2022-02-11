import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainMenu from '../Components/Menu/Menu';

import Questions from '../Components/Questions/Questions';
import Header from '../Components/Header/Header';
import Team from '../Components/Team/Team';

import MyProfile from '../Components/MyProfile/MyProfile';
import CompanyWall from '../Components/CompanyWall/CompanyWall';

import NotFound from '../Components/NotFound/NotFound';
import UserMenu from '../Components/Menu/UserMenu';
import UserQuestions from '../Components/UserQuestions/UserQuestions';

const UserRoutes = (props) => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <UserMenu />
                <Routes>
                    <Route path="/" element={<UserQuestions />} />
                    <Route path="/my-profile" element={<MyProfile />} />
                    <Route path="/team" element={<CompanyWall />} />
                    <Route path="/team/:slug" element={<CompanyWall />} />
                    <Route component={NotFound} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default UserRoutes;
