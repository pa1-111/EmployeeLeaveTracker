import React from 'react';
import { SidebarData } from '../pages/Login/employee/SidebarData';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
 console.log("narnedra");
  return (
    <div className="sidebar">
      <ul className="sidebarList">
        {SidebarData.map((val, key) => (
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
    </div>
  );
}

export default Sidebar;
