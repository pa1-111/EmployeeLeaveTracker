import React from 'react';
import users from '../../users.json';
import { useAuth } from '../../context/AuthContext';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user } = useAuth(); // Get logged-in user info from context

  if (!user || user.role !== "employee") {
    return <p>Unauthorized: No employee is logged in.</p>;
  }

  // Find the full employee details using the logged-in user ID
  const employee = users.employees.find(emp => emp.id === user.id);

  if (!employee) {
    return <p>Employee data not found.</p>;
  }

  return (
    <div className="welcome-card">
      <h2>Welcome! {employee.name}</h2>
      <p className="leave-balance">
        Leave Balance: <span>{employee.leaveBalance}</span>
      </p>
      <p className="leave-balance">
        Casual Leaves: <span>{employee.casualLeave}</span>
      </p>
      <p className="leave-balance">
        Sick Leaves: <span>{employee.sickLeave}</span>
      </p>
      <p className="leave-balance">
        Work from Home: <span>{employee.workFromHome}</span>
      </p>
    </div>
  );
};

export default DashboardPage;
