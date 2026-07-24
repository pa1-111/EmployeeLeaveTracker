import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddLeave.css";

const AddLeave = ({ onLeaveAdded }) => {
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = async () => {
    const employeeId = localStorage.getItem("employeeId");

    if (!employeeId) {
      toast.error("Employee ID not found. Please login first.");
      return;
    }

    if (!leaveType || !fromDate || !toDate || !reason) {
      toast.warn("Please fill in all fields before submitting.");
      return;
    }

    const requestBody = {
      employeeId,
      leaveType,
      startDate: fromDate,
      endDate: toDate,
      reason,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/leaves/apply",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Leave request submitted successfully!");
        setLeaveType("");
        setFromDate("");
        setToDate("");
        setReason("");

        if (onLeaveAdded) onLeaveAdded();
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to connect to server: " + error.message);
    }
  };

  return (
    <div className="addLeave-container">
      <h2>Request for Leave</h2>

      <label>Leave Type</label>
      <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
        <option value="" disabled>
          -- Select Leave Type --
        </option>
        <option value="Casual Leave">Casual Leave</option>
        <option value="Sick Leave">Sick Leave</option>
        <option value="Work From Home">Work From Home</option>
      </select>

      <label>From Date</label>
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />

      <label>To Date</label>
      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        min={fromDate}
      />

      <label>Description</label>
      <input
        type="text"
        placeholder="Enter reason for leave"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>

      {/* Toast Container: required for showing toasts */}
      <ToastContainer
        position="top-right"
        autoClose={3000}   // hide automatically after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default AddLeave;
