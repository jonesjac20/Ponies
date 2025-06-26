import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/App.css';

export default function NavTabs() {
    return (
        <div className="nav-tabs">
            <NavLink to="/screens/Leaderboard" className="active">
                Leaderboard
            </NavLink>
            <NavLink to="/screens/Admin" className="active">
                Admin
            </NavLink>
        </div>
    );
}