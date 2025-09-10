import './styles/App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Leave from './pages/employee/Leave';
import ProfilePage from './pages/employee/ProfilePage';
import Setting from './components/Setting';
import DashboardPage from './pages/employee/DashboardPage';
import AddLeave from './pages/employee/AddLeave';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/loginapp/Login';
import SidebarAdmin from './components/SidebarAdmin';
import DashboardAdmin from './pages/Admin/DashboardAdmin';
import EmployeeDetails from './pages/Admin/EmployeeDetails';
import ManageLeaves from './pages/Admin/ManageLeaves';
import EmployeeLayout from './pages/loginapp/EmployeeLogin'; 
// 👆 I renamed this in code: It’s actually the EMPLOYEE DASHBOARD LAYOUT, not just login

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Login Routes */}
        <Route path="/login" element={<Login />} />

        {/* Employee Routes */}
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute>
              <EmployeeLayout /> {/* ✅ Acts like Sidebar + Outlet for Employee */}
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="profilepage" element={<ProfilePage />} />
          <Route path="leave" element={<Leave />} />
          <Route path="leave/add" element={<AddLeave />} />
          <Route path="settings" element={<Setting />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <SidebarAdmin /> {/* ✅ Sidebar + Outlet for Admin */}
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardAdmin />} />
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="settings" element={<Setting />} />
          <Route path="employees" element={<EmployeeDetails />} />
          <Route path="leaves" element={<ManageLeaves />} />
          <Route path="leaves/:status" element={<ManageLeaves />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
