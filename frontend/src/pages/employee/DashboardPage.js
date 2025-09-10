import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user } = useAuth(); // logged-in user from context
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === "employee") {
      axios
        .get(`http://localhost:8080/employee/${user.id}`)
        .then((res) => {
          setEmployee(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching employee details:", err);
          setLoading(false);
        });
    }
  }, [user]);

  if (!user || user.role !== "employee") {
    return <p>Unauthorized: No employee is logged in.</p>;
  }

  if (loading) {
    return <p>Loading employee details...</p>;
  }

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
