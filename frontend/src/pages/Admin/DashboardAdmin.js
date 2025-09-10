import React, { useEffect, useState } from 'react';
import { BsPeopleFill, BsFileEarmarkRuledFill, BsCheck2Circle, BsHourglassSplit, BsXSquare } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import './DashboardAdmin.css';

const DashboardAdmin = () => {
  const [counts, setCounts] = useState({
    employees: 0,
    applied: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, appliedRes, approvedRes, pendingRes, rejectedRes] = await Promise.all([
          fetch("http://localhost:8080/api/employees/count"),
          fetch("http://localhost:8080/api/leaves/count/applied"),
          fetch("http://localhost:8080/api/leaves/count/approved"),
          fetch("http://localhost:8080/api/leaves/count/pending"),
          fetch("http://localhost:8080/api/leaves/count/rejected"),
        ]);

        setCounts({
          employees: (await empRes.json()).data,
          applied: (await appliedRes.json()).data,
          approved: (await approvedRes.json()).data,
          pending: (await pendingRes.json()).data,
          rejected: (await rejectedRes.json()).data,
        });
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchData();
  }, []);

  // Card click navigation
  const handleCardClick = (type) => {
    switch (type) {
      case "employees":
        navigate("/admin-dashboard/employees");
        break;
      case "applied":
        navigate("/admin-dashboard/leaves");
        break;
      case "approved":
        navigate("/admin-dashboard/leaves/approved");
        break;
      case "pending":
        navigate("/admin-dashboard/leaves/pending");
        break;
      case "rejected":
        navigate("/admin-dashboard/leaves/rejected");
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboardAdmin">
      <h2>Dashboard Overview</h2>

      {/* Total Employees */}
      <div className="container1" onClick={() => handleCardClick("employees")}>
        <BsPeopleFill size={40} />
        <p>{counts.employees}</p>
        <span>All Employees</span>
      </div>

      <h2 className="leave-title">Leave Details</h2>

      <div className="container-wrap">
        <div className="container applied" onClick={() => handleCardClick("applied")}>
          <BsFileEarmarkRuledFill size={40} />
          <p>{counts.applied}</p>
          <span>Leave Applied</span>
        </div>

        <div className="container approved" onClick={() => handleCardClick("approved")}>
          <BsCheck2Circle size={40} />
          <p>{counts.approved}</p>
          <span>Leave Approved</span>
        </div>

        <div className="container pending" onClick={() => handleCardClick("pending")}>
          <BsHourglassSplit size={40} />
          <p>{counts.pending}</p>
          <span>Leave Pending</span>
        </div>

        <div className="container rejected" onClick={() => handleCardClick("rejected")}>
          <BsXSquare size={40} />
          <p>{counts.rejected}</p>
          <span>Leave Rejected</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
