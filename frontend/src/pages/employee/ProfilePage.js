import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const employeeId = localStorage.getItem("employeeId"); // get from login storage
    if (!employeeId) {
      console.error("Employee ID not found. Please login first.");
      return;
    }

    axios
      .get(`http://localhost:8080/employee/${employeeId}`)
      .then((res) => setEmployee(res.data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  if (!employee) return <p>Loading profile...</p>;

  return (
    <div className="employee-details">
      <h2>Employee Details</h2>
      <div className="field">
        <span className="label">Employee ID:</span>
        <span className="value">{employee.id}</span>
      </div>
      <div className="field">
        <span className="label">Name:</span>
        <span className="value">{employee.name}</span>
      </div>
      <div className="field">
        <span className="label">Date of Joining:</span>
        <span className="value">{employee.dateOfJoining}</span>
      </div>
      <div className="field">
        <span className="label">Gender:</span>
        <span className="value">{employee.gender}</span>
      </div>
      <div className="field">
        <span className="label">Role:</span>
        <span className="value">{employee.role}</span>
      </div>
    </div>
  );
};

export default ProfilePage;
