import React from 'react'
import './AddLeave.css';
const AddLeave = () => {
  return (
    <div className="addLeave-container">
      <h2>Request for Leave</h2>
      <label value="label"> Leave Type</label>
      <select className="dropdown" name="leavetype" required>
        <option value="label">Casual Leave</option>
        <option value="label">Sick Leave</option>
        <option value="label">Work From Home</option>
      </select>
    
      <label for ="From Date" > From Date</label>
      <input type="date" id ="from Date" name ="mm/dd/yyy" required/>
      <label for="To Date"> To Date</label>
      <input type="date" id ="from Date" name ="mm/dd/yyy" required/>
      <label>Description</label>
      <input type="text" name="Reason"/>
      <button className="submit">Submit</button>

    </div>
  )
}

export default AddLeave;
