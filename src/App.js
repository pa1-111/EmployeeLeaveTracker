import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Leave from './Leave';
import ProfilePage from './ProfilePage';
import Setting from './Setting';
import DashboardPage from './DashboardPage';
import AddLeave from './AddLeave';
// import EmployeeLogin from './EmployeeLogin';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import SidebarAdmin from './components/SidebarAdmin';
import DashboardAdmin from './DashboardAdmin';
import EmployeeDetails from './EmployeeDetails';
import ManageLeaves from './ManageLeaves';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <Routes>
       
        <Route path="/login" element={<Login/>}/>

        
        <Route
          path="/employee-dashboard"
         element={
          <ProtectedRoute>
            < Sidebar/>
          </ProtectedRoute>
        }
          >
          <Route index element={<DashboardPage />} />
          <Route path="profilepage" element={<ProfilePage />} />
          <Route path="leave" element={<Leave />} />
          <Route path="leave/add" element={<AddLeave />} />
          <Route path="settings" element={<Setting />} />

        </Route>

        <Route
           path="/admin-dashboard" 
          element={
            
              <SidebarAdmin />
             
          }
          >

         
        <Route path="dashboard" element={<DashboardAdmin/>}/>
        <Route path="settings" element={<Setting/>}/>
        <Route path="employees" element={<EmployeeDetails/>}/>
        <Route path="leaves" element={<ManageLeaves/>}/>
        </Route>
       
      </Routes>
    </div>
  );
}

export default App;
