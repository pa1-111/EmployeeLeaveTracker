import React from "react";
import {useAuth} from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const {logout } =useAuth();
    const navigate =useNavigate();

    const handleLogout =() =>{
        logout();
        navigate('/');
    }
  return (
    <header className="header">
        <h2> Employee Leave Tracker</h2>
        <button className="logout-button" onClick={handleLogout}>Logout
        </button>

    </header>
  );
};

export default Header;
