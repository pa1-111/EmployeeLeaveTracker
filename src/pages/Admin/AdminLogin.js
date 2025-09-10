import React from 'react';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const AdminLogin = () => {
  return (
    <div>
      <Header/>
      <div >
      <Sidebar />
      <div >
        <Outlet />  {/* This is where your pages will render */}
      </div>
    </div>
    </div>
    
  );
};

export default AdminLogin;
