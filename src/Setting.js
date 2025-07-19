import React from 'react'

const Setting = () => {
  return (
    <div className="setting-container">
      <h2>Update Password</h2>
        <label className="required-label">Current Password</label>
        <input
        id="Email"
        type="password"
        placeholder="Change Password "
        required/>
        <label className="required-label">New Password</label>
        <input
        id="Password"
        type="password"
        placeholder=" New password"
        required/>
        <label className="required-label">Confirm Password</label>
        <input
        id="Password"
        type="password"
        placeholder="Confirm password"
        required/>
        <button type="submit">Change Password</button>
    </div>
  )
}

export default Setting;
