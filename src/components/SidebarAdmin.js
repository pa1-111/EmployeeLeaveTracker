import React from 'react';
import { SidebarDataAdmin } from '../pages/Admin/SidebarDataAdmin';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
//import '../App.css'; // Assuming styles are there
import '../components/SidebarAdmin.css';

import Header from './Header';
function SidebarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Header />

      <div className="admin-container">
        {/* Sidebar */}
        <div className="sidebar">
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
        </div>

        {/* Main content area */}
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default SidebarAdmin;
