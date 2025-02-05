import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/NavBar/NavBar.tsx";
import UsersGrid from "./pages/User/UsersGrid.tsx";
import SaleNoticesGrid from "./pages/SaleNotice/SaleNoticesGrid.tsx";
import CreateSaleNotice from "./pages/SaleNotice/CreateSaleNoticePage.tsx";
import SaleNoticeDetailsPage from "./pages/SaleNotice/SaleNoticeDetailsPage.tsx";
import React from "react";
import CreateUserPage from "./pages/User/CreateUserPage.tsx";
import UserDetailsPage from "./pages/User/UserDetailsPage.tsx";
import EditUserPage from "./pages/User/EditUserPage.tsx";
import EditSaleNoticePage from "./pages/SaleNotice/EditSaleNoticePage.tsx";
import {View} from "./appConstants.ts";
import ReportsAndStatisticsPage from "./pages/ReportsAndStatistics/ReportsAndStatisticsPage.tsx";

const App: React.FC = () => {

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<SaleNoticesGrid />} />
                <Route path={View.Users} element={<UsersGrid />} />
                <Route path={View.CreateUser} element={<CreateUserPage />} />
                <Route path="/users/edit/:id" element={<EditUserPage />} />
                <Route path="/users/details/:id" element={<UserDetailsPage />} />
                <Route path={View.SaleNotices} element={<SaleNoticesGrid />} />
                <Route path={View.CreateSaleNotice} element={<CreateSaleNotice />} />
                <Route path="/sale-notices/edit/:id" element={<EditSaleNoticePage />} />
                <Route path="/sale-notices/details/:id" element={<SaleNoticeDetailsPage />} />
                <Route path={View.ReportsAndStatistics} element={<ReportsAndStatisticsPage />} />
            </Routes>
        </BrowserRouter>
    )
};

export default App;
