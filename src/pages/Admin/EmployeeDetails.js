import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EmployeeDetails.css';

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/employee/all")
      .then((res) => {
        console.log("API Response:", res.data);  // 👈 Debug log
        // If your backend returns { data: [...] }
        if (res.data.data) {
          setEmployees(res.data);
        } else {
          setEmployees(res.data);
        }
      })
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  return (
    <div className="employee-table-container">
      <h2>Employee Details</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Joining Date</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp.id}>
              <td>{index + 1}</td>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.role}</td>
              <td>{emp.email}</td>
              <td>{emp.dateOfJoining ? new Date(emp.dateOfJoining).toLocaleDateString() : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDetails;
