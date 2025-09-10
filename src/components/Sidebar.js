import React from 'react';
import './Sidebar.css';

import { SidebarData } from '../pages/employee/SidebarData';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="sidebar">
      <ul className="sidebarList">
        {SidebarData.map((val, key) => (
          <li
            key={key}
            className={`row ${location.pathname === val.link ? 'active' : ''}`}

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
