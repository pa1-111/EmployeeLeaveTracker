import React, { useEffect, useState } from 'react'
import users from './users.json'

const EmployeeDetails = () => {
    const[employees,setEmployees] = useState([]);

    useEffect(()=>{
        setEmployees(users.employees);
    },[]);
  return (
    <div className="employee-table-container">
      <h2>Employee Details</h2>
      <table className="employee-table">
              <thead>
                <tr>
                  <th>S.No    </th>
                  <th>Employee ID </th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Joining Date</th>
                </tr>
              </thead>
                <tbody>
                    {employees.map((emp,index)=>(
                        <tr key ={emp.id}>
                    <td>{index +1}</td>
                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.role}</td>
                    <td>{emp.email}</td>
                    <td>{emp.dateOfJoining}</td>
                  </tr>
                    ))}
                  
                </tbody>
        </table>
    </div>
  );
};

export default EmployeeDetails;
