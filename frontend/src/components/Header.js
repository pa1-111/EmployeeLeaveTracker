import React from "react";
import {useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import './Header.css';

const Header = () => {
    const {logout } =useAuth();
    const navigate =useNavigate();

    const handleLogout =() =>{
        logout();
        navigate('/');
    }
  return (
    <header className="header">
        <h2 className="app-title"> Employee Leave Tracker</h2>
        <button className="logout-button" onClick={handleLogout}>Logout
        </button>

    </header>
  );
};

export default Header;
