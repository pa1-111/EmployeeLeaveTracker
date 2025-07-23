import React, { useState } from 'react';
import '../../styles/Login.css';
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom"
import data from "../../users.json"

const Login = () =>{
    const {login} =useAuth();
    const navigate =useNavigate();
    const[userID,setuserID]=useState('');
    const[password,setPassword]=useState('');

    const handleLogin= async(e)=>{
        e.preventDefault();

        try{
          if (userID === data.admin.id && password === data.admin.password) {
            login({id:userID, role :"admin"});
          navigate("/admin-dashboard");
          return;
        }

        const matchedEmployee=data.employees.find(
          (emp) => emp.id === userID && emp.password ===password
        );

        if(matchedEmployee){
          login({ id: matchedEmployee.id, role: "employee" });
          navigate("/employee-dashboard",{state:{employee : matchedEmployee}});
        }
        else{
          alert("Invalid credentials")
        }

      }
        catch(error){
          alert("Login error, please try again");
        }
        };


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label className="required-label">userID</label>
        <input
        id="userID"
        type="text"
        placeholder="Enter User ID"
        value={userID}
        onChange={(e) => setuserID(e.target.value)}
        required
        />
        <label className="required-label">Password</label>
        <input
        id="password"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
