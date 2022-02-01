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
import CompanyWall from '../Components/CompanyWall/CompanyWall';
import ReactQueryTeam from '../Components/Team/ReactQueryTeam';
import NotFound from '../Components/NotFound/NotFound';

const AdminRoutes = (props) => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <MainMenu role={props.role} />
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
                    <Route
                        path="/team/:id/edit"
                        element={<EditProfile edit="editPublished" />}
                    />
                    {/* Team Page Pending */}
                    <Route
                        exact
                        path="/team/pending"
                        element={<Team status="pending" />}
                    />
                    <Route
                        path="/team/pending/:id/edit"
                        element={<EditProfile />}
                    />
                    <Route path="/my-profile" element={<MyProfile />} />
                    <Route path="/team/:slug" element={<CompanyWall />} />
                    <Route path="/reactquery" element={<ReactQueryTeam />} />
                    <Route component={NotFound} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default AdminRoutes;
