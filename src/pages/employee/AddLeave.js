import React, { useState } from 'react';
import './AddLeave.css';

const AddLeave = ({ onLeaveAdded }) => {
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = async () => {
    const employeeId = localStorage.getItem("employeeId");

    if (!employeeId) {
      alert("Employee ID not found. Please login first.");
      return;
    }

    // 👇 Map frontend variable to backend keys
    const requestBody = { 
      employeeId, 
      leaveType, 
      startDate: fromDate,   // match backend
      endDate: toDate, 
      reason 
    };

    try {
      const response = await fetch("http://localhost:8080/api/leaves/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      alert(data.status + ": " + (data.message || ""));

      if (response.ok) {
        setLeaveType("");
        setFromDate("");
        setToDate("");
        setReason("");

        if (onLeaveAdded) onLeaveAdded();
      }
    } catch (error) {
      alert("Failed to connect to server: " + error.message);
    }
  };

  return (
    <div className="addLeave-container">
      <h2>Request for Leave</h2>

      <label>Leave Type</label>
      <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
        <option value="">--Select--</option>
        <option value="Casual Leave">Casual Leave</option>
        <option value="Sick Leave">Sick Leave</option>
        <option value="Work From Home">Work From Home</option>
      </select>

      <label>From Date</label>
      <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />

      <label>To Date</label>
      <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />

      <label>Description</label>
      <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddLeave;
