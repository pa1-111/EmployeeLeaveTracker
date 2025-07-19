import React from 'react';
import { useNavigate } from 'react-router-dom';

const Leave = () => {

  const navigate= useNavigate();
  return (
    <div>
        <h2>Manage leaves</h2>

        <button class ="favorite-styled" 
        type="button"
        onClick={() => navigate('add')}>
          Add Leave
          </button>

          <div className="manage-leaves">
            <table className="table-design">
              <thead>
                <tr>
                  <th>S.No    </th>
                  <th>Leave type   </th>
                  <th>From Date   </th>
                  <th>To Date  </th>
                  <th>Applied Date  </th>
                  <th>Status</th>
                </tr>
              </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Sick Leave</td>
                    <td>2024-10-01</td>
                    <td>2024-10-03</td>
                    <td>2024-09-30</td>
                    <td>Approved</td>
                  </tr>
  </tbody>
            </table>

          </div>
      
    </div>
  );
};

export default Leave;
