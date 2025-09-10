import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Leave.css";

const Leave = () => {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const employeeId = localStorage.getItem("employeeId"); // get from login

  useEffect(() => {
    if (!employeeId) {
      console.error("Employee ID not found. Please login first.");
      return;
    }

    // Fetch leave history of employee
    axios
      .get(`http://localhost:8080/api/leaves/history/${employeeId}`)
      .then((res) => {
        console.log("Leaves from backend:", res.data); // 👈 check keys here
        if (res.data.status === "Success") {
          setLeaves(res.data.data);
        } else {
          setLeaves([]); // no data case
        }
      })
      .catch((err) => console.error("Error fetching leaves:", err));
  }, [employeeId]);

  // helper function to format dates safely
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toISOString().split("T")[0];
    } catch {
      return dateString;
    }
  };

  // helper to get correct field names dynamically
  const getFromDate = (leave) =>
    leave.fromDate || leave.startDate || leave.from_date || "";
  const getToDate = (leave) =>
    leave.toDate || leave.endDate || leave.to_date || "";

  return (
    <div>
      <h2>Manage Leaves</h2>

      <button
        className="favorite-styled"
        type="button"
        onClick={() => navigate("add")}
      >
        Add Leave
      </button>

      <div className="manage-leaves">
        <table className="table-design">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Leave Type</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No leaves applied yet.
                </td>
              </tr>
            ) : (
              leaves.map((leave, index) => (
                <tr key={leave.id || index}>
                  <td>{index + 1}</td>
                  <td>{leave.leaveType}</td>
                  <td>{formatDate(getFromDate(leave))}</td>
                  <td>{formatDate(getToDate(leave))}</td>
                  <td>{leave.reason}</td>
                  <td>{leave.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leave;
