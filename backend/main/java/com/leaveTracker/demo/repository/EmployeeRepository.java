package com.leaveTracker.demo.repository;


import com.leaveTracker.demo.model.LeaveRequest;
import com.leaveTracker.demo.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface EmployeeRepository extends JpaRepository<Employee,String>{


}
