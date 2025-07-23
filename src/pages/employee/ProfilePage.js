import React from 'react'
import users from '../../users.json';

const ProfilePage = () => {
  const employee=users.employees[0];
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
        <span className="label">Date of joining:</span>
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
  )
}

export default ProfilePage;
