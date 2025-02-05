import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {View} from "../../appConstants.ts";

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to={View.Users}>Users</Link></li>
                <li><Link to={View.SaleNotices}>Sale Notices</Link></li>
                <li><Link to={View.ReportsAndStatistics}>Reports And Statistic</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
