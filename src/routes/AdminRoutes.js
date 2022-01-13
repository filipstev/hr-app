import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompanyInfo from '../Components/CompanyInfo/CompanyInfo';
import MainMenu from '../Components/Menu/Menu';

import Pending from '../Components/Pending/Pending';
import AddQuestion from '../Components/Questions/AddQuestion/AddQuestion';
import Questions from '../Components/Questions/Questions';
import Header from '../Components/Header/Header';
import Team from '../Components/Team/Team';
import EditProfile from '../Components/Team/TeamEdit/EditProfile';
import EditQuestion from '../Components/Questions/EditQuestion/EditQuestion';
import MyProfile from '../Components/MyProfile/MyProfile';

const JoinRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <MainMenu />
                <Routes>
                    <Route path="/" element={<CompanyInfo />} />
                    <Route path="/questions" element={<Questions />} />
                    <Route path="/company" element={<CompanyInfo />} />
                    <Route path="/new-question" element={<AddQuestion />} />
                    <Route path="edit-question" element={<EditQuestion />} />
                    {/* Team Page Published */}
                    <Route
                        path="/team/"
                        element={<Team status="published" />}
                    />
                    {/* Team Page Pending */}
                    <Route
                        path="/team/pending"
                        element={<Team status="pending" />}
                    />
                    <Route path="/team/:id/edit" element={<EditProfile />} />
                    <Route
                        path="/team/pending/:id/edit"
                        element={<EditProfile />}
                    />
                    <Route path="/my-profile" element={<MyProfile />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default JoinRoutes;
