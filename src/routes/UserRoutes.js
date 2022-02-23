import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainMenu from '../Components/Menu/Menu';

import Questions from '../Components/Questions/Questions';
import Header from '../Components/Header/Header';
import Team from '../Components/Team/Team';
import UserHeader from '../Components/Header/UserHeader';

import MyProfile from '../Components/MyProfile/MyProfile';
import CompanyWall from '../Components/CompanyWall/CompanyWall';

import NotFound from '../Components/NotFound/NotFound';
import UserMenu from '../Components/Menu/UserMenu';
import UserQuestions from '../Components/UserQuestions/UserQuestions';
import axiosInstance from '../helpers/axiosInstance';
import UserTeam from '../Components/UserTeam/UserTeam';

const UserRoutes = (props) => {
    useEffect(async () => {
        const company = axiosInstance.get('/companies?filters?[id][$eq]=2');
    }, []);
    return (
        <>
            <BrowserRouter>
                <UserHeader />
                <UserMenu />
                <Routes>
                    <Route path="/" element={<UserQuestions />} />
                    <Route path="/my-profile" element={<MyProfile />} />
                    <Route path="/team" element={<UserTeam />} />
                    <Route path="/team/:slug" element={<CompanyWall />} />
                    <Route component={NotFound} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default UserRoutes;
