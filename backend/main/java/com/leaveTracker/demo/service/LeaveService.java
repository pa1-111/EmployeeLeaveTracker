package com.leaveTracker.demo.service;

import com.leaveTracker.demo.dto.LeaveRequestDto;
import com.leaveTracker.demo.model.*;
import com.leaveTracker.demo.repository.LeaveRepository;
import com.leaveTracker.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class LeaveService {

    @Autowired
    private LeaveRepository leaveRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // Apply leave
    public LeaveRequest applyLeave(LeaveRequestDto dto) {
        Employee emp = employeeRepository.findById(dto.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + dto.getEmployeeId()));

        LeaveRequest leaveRequest = new LeaveRequest();
        leaveRequest.setEmployee(emp);
        leaveRequest.setStartDate(dto.getStartDate());
        leaveRequest.setEndDate(dto.getEndDate());
        leaveRequest.setReason(dto.getReason());
        leaveRequest.setLeaveType(dto.getLeaveType());
        leaveRequest.setStatus(LeaveStatus.PENDING);

        return leaveRepository.save(leaveRequest);
    }

    // Get leaves by employee
    public List<LeaveRequest> getLeaveByEmployee(String empId) {
        Employee emp = employeeRepository.findById(empId)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + empId));
        return leaveRepository.findByEmployee(emp);
    }

    // Get all leaves
    public List<LeaveRequest> getAllLeaves() {
        return leaveRepository.findAll();
    }

    // ✅ Approve leave with deduction and update leaveBalance
    @Transactional
    public LeaveRequest approveLeave(Long leaveId) {
        LeaveRequest lr = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave request not found with ID: " + leaveId));

        if (lr.getStatus() != LeaveStatus.PENDING) {
            throw new RuntimeException("Leave request already processed");
        }

        Employee emp = lr.getEmployee();

        // inclusive days: e.g., 27–28 = 2 days
        long leaveDays = lr.getEndDate().toEpochDay() - lr.getStartDate().toEpochDay() + 1;
        if (leaveDays <= 0) throw new RuntimeException("Invalid date range");

        switch (lr.getLeaveType()) {
            case SICK_LEAVE:
                if (emp.getSickLeave() < leaveDays) throw new RuntimeException("Insufficient sick leave balance");
                emp.setSickLeave(emp.getSickLeave() - (int) leaveDays);
                break;

            case CASUAL_LEAVE:
                if (emp.getCasualLeave() < leaveDays) throw new RuntimeException("Insufficient casual leave balance");
                emp.setCasualLeave(emp.getCasualLeave() - (int) leaveDays);
                break;

            case WORK_FROM_HOME:
                if (emp.getWorkFromHome() < leaveDays) throw new RuntimeException("Insufficient WFH balance");
                emp.setWorkFromHome(emp.getWorkFromHome() - (int) leaveDays);
                break;
        }

        // ✅ total balance should be ONLY Sick + Casual
        emp.setLeaveBalance(emp.getSickLeave() + emp.getCasualLeave());

        // 👇 Force the employee update to hit the DB immediately
        employeeRepository.saveAndFlush(emp);

        // Update leave status and persist
        lr.setStatus(LeaveStatus.APPROVED);
        return leaveRepository.saveAndFlush(lr);
    }


    // Reject leave
    public LeaveRequest rejectLeave(Long leaveId) {
        LeaveRequest lr = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave request not found with ID: " + leaveId));

        if (lr.getStatus() != LeaveStatus.PENDING) {
            throw new RuntimeException("Leave request already processed");
        }

        lr.setStatus(LeaveStatus.REJECTED);
        lr.setEmployee(lr.getEmployee());
        return leaveRepository.save(lr);
    }

    /**
     * ✅ Helper method: split leave days across months
     */
    private Map<String, Long> calculateLeaveByMonth(LocalDate start, LocalDate end) {
        Map<String, Long> leaveDaysByMonth = new HashMap<>();
        LocalDate current = start;

        while (!current.isAfter(end)) {
            String monthKey = current.getYear() + "-" + current.getMonthValue(); // e.g. "2025-9"
            leaveDaysByMonth.put(monthKey, leaveDaysByMonth.getOrDefault(monthKey, 0L) + 1);
            current = current.plusDays(1);
        }
        return leaveDaysByMonth;
    }

    public List<LeaveRequest> getLeavesByStatus(String status) {
        LeaveStatus leaveStatus = LeaveStatus.valueOf(status.toUpperCase());
        return leaveRepository.findByStatus(leaveStatus);
    }

}
