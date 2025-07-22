import React from 'react';
import { SidebarDataAdmin } from '../pages/Admin/SidebarDataAdmin';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import Header from './Header';
import {Outlet} from "react-router-dom";

function SidebarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sidebar">
      <Header/>
      
      <ul className="sidebarList">
        {SidebarDataAdmin.map((val, key) => (
          <li
            key={key}
            className={`row ${location.pathname.endsWith(val.link) ? 'active' : ''}`}
            onClick={() => navigate(val.link)}
          >
            <div className="icon">{val.icon}</div>
            <div className="title">{val.title}</div>
          </li>
        ))}
      </ul>
      <div>
        <Outlet/>
      </div>
    </div>
  );
}

export default SidebarAdmin;
