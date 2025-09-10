import React, { useEffect, useState, useCallback } from 'react';
import './ManageLeaves.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ManageLeaves = () => {
  const { status } = useParams(); 
  const currentStatus = status || 'all'; // undefined treated as "all"

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = useCallback(async () => {
    try {
      let url = 'http://localhost:8080/api/leaves';
      if (currentStatus !== "all") {
        url = `http://localhost:8080/api/leaves/status/${currentStatus}`;
      }
      const response = await axios.get(url);
      setLeaves(response.data.data || response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leaves:', error);
      setLoading(false);
    }
  }, [currentStatus]);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const handleApprove = async (leaveId) => {
    try {
      await axios.put(`http://localhost:8080/api/leaves/approve/${leaveId}`);
      fetchLeaves();
    } catch (error) {
      console.error('Error approving leave:', error);
    }
  };

  const handleReject = async (leaveId) => {
    try {
      await axios.put(`http://localhost:8080/api/leaves/reject/${leaveId}`);
      fetchLeaves();
    } catch (error) {
      console.error('Error rejecting leave:', error);
    }
  };

  if (loading) return <p>Loading leave requests...</p>;

  // Always show Actions column if coming from Admin dashboard (currentStatus = all)
  const showActionsColumn = currentStatus === 'pending' || currentStatus === 'all';

  return (
    <div className="manage-leaves-wrapper">
      <h2>
        Manage Leaves {currentStatus !== "all" ? `- ${currentStatus.toUpperCase()}` : ''}
      </h2>

      {leaves.length === 0 ? (
        <p>No leave requests found.</p>
      ) : (
        <div className="table-container">
          <table className="leaves-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
                {showActionsColumn && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave, index) => (
                <tr key={leave.id}>
                  <td>{index + 1}</td>
                  <td>{leave.employee?.id}</td>
                  <td>{leave.employee?.name}</td>
                  <td>{leave.leaveType}</td>
                  <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td>{leave.reason}</td>
                  <td>{leave.status}</td>
                  {showActionsColumn && leave.status === 'PENDING' ? (
                    <td>
                      <button onClick={() => handleApprove(leave.id)}>Approve</button>
                      <button onClick={() => handleReject(leave.id)}>Reject</button>
                    </td>
                  ) : showActionsColumn ? (
                    <td></td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageLeaves;
