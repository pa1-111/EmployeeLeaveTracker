// import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Leave from './pages/employee/Leave';
import ProfilePage from './pages/employee/ProfilePage';
import Setting from './pages/employee/Setting';
import DashboardPage from './pages/employee/DashboardPage';
import AddLeave from './pages/employee/AddLeave';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/loginapp/Login';
import SidebarAdmin from './components/SidebarAdmin';
import DashboardAdmin from './pages/Admin/DashboardAdmin';
import EmployeeDetails from './pages/Admin/EmployeeDetails';
import ManageLeaves from './pages/Admin/ManageLeaves';
// import Sidebar from './components/Sidebar';
import EmployeeLogin from './pages/loginapp/EmployeeLogin';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Employee Routes */}
          <Route
            path="/employee-dashboard"
            element={
            <ProtectedRoute>
              <EmployeeLogin />
            </ProtectedRoute>
                
             
            }
          >
            <Route path="" element={<DashboardPage />} />
            <Route path="profilepage" element={<ProfilePage />} />
            <Route path="leave" element={<Leave />} />
            <Route path="leave/add" element={<AddLeave />} />
            <Route path="settings" element={<Setting />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<SidebarAdmin />}>
            <Route path="dashboard" element={<DashboardAdmin />} />
            <Route path="settings" element={<Setting />} />
            <Route path="employees" element={<EmployeeDetails />} />
            <Route path="leaves" element={<ManageLeaves />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
