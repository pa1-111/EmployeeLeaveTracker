package com.leaveTracker.demo.repository;

import com.leaveTracker.demo.model.LeaveRequest;
import com.leaveTracker.demo.model.Employee;
import com.leaveTracker.demo.model.LeaveStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRepository extends JpaRepository<LeaveRequest, Long> {

    List<LeaveRequest> findByEmployee(Employee employee);

    List<LeaveRequest> findByStatus(LeaveStatus status);

}
