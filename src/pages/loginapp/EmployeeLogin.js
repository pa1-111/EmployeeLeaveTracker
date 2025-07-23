import React from 'react';
import Sidebar from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

const EmployeeLogin = () => {
  console.log("employee login")
  return (
    <div>
      <Header/>
      <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <Outlet />  {/* This is where your pages will render */}
      </div>
    </div>
    </div>
    
  );
};

export default EmployeeLogin;
