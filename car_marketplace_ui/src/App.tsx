import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/NavBar/NavBar.tsx";
import UsersTable from "./pages/User/UsersTable.tsx";
import SaleNoticesTable from "./pages/SaleNotice/SaleNoticesTable.tsx";
import CreateSaleNotice from "./pages/SaleNotice/CreateSaleNoticePage.tsx";
import SaleNoticeDetailsPage from "./pages/SaleNotice/SaleNoticeDetailsPage.tsx";
import React from "react";
import CreateUserPage from "./pages/User/CreateUserPage.tsx";
import UserDetailsPage from "./pages/User/UserDetailsPage.tsx";
import EditUserPage from "./pages/User/EditUserPage.tsx";
import EditSaleNoticePage from "./pages/SaleNotice/EditSaleNoticePage.tsx";

const App: React.FC = () => {

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<SaleNoticesTable />} />
                <Route path="/users" element={<UsersTable />} />
                <Route path="/sale-notices" element={<SaleNoticesTable />} />
                <Route path="/sale-notices/edit/:id" element={<EditSaleNoticePage />} />
                <Route path="/create-sale-notice" element={<CreateSaleNotice />} />
                <Route path="/users/create" element={<CreateUserPage />} />
                <Route path="/users/edit/:id" element={<EditUserPage />} />
                <Route path="/users/details/:id" element={<UserDetailsPage />} />
                <Route path="sale-notices/details/:id" element={<SaleNoticeDetailsPage />} />
            </Routes>
        </BrowserRouter>
    )
};

export default App;
