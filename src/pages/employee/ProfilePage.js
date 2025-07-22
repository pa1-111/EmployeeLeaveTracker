import React from 'react'

const ProfilePage = () => {
  return (
    <div className="employee-details">
      <h2>Employee Details</h2>
      <div className="field">
        <span className="label">Employee ID:</span>
        <span className="value">12345</span>
      </div>
      <div className="field">
        <span className="label">Name:</span>
        <span className="value">E.Pavan</span>
      </div>
      <div className="field">
        <span className="label">Date of joining:</span>
        <span className="value">16-10-2024</span>
      </div>
      <div className="field">
        <span className="label">Gender:</span>
        <span className="value">Male</span>
      </div>
      <div className="field">
        <span className="label">Role:</span>
        <span className="value">Engineer</span>
      </div>
    </div>
  )
}

export default ProfilePage;
