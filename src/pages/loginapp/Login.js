import React, { useState } from 'react';
import './Login.css';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        id: userID,
        password: password
      });

      if (res.data === "ADMIN") {
        login({ id: userID, role: "admin" });
        localStorage.setItem("employeeId", userID); // store admin ID if needed
        navigate("/admin-dashboard");
      } else if (res.data === "EMPLOYEE") {
        login({ id: userID, role: "employee" });
        localStorage.setItem("employeeId", userID); // store employee ID
        navigate("/employee-dashboard");
      }
    } catch (error) {
      alert("Invalid credentials");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label className="required-label">UserID</label>
        <input
          type="text"
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
          required
        />
        <label className="required-label">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
