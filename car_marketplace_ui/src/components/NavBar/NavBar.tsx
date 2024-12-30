import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/users">Users</Link></li>
                <li><Link to="/sale-notices">Sale Notices</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
