package com.leaveTracker.demo.controller;

import com.leaveTracker.demo.dto.LeaveRequestDto;
import com.leaveTracker.demo.model.LeaveRequest;
import com.leaveTracker.demo.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
public class LeaveController {

    @Autowired
    private LeaveService leaveService;

    // Apply Leave
    @PostMapping("/apply")
    public ResponseEntity<?> applyLeave(@RequestBody LeaveRequestDto dto) {
        try {
            LeaveRequest lr = leaveService.applyLeave(dto);
            return ResponseEntity.ok(Map.of(
                    "status", "Success",
                    "message", "Leave request submitted successfully",
                    "data", lr
            ));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status", "Error",
                    "message", ex.getMessage()
            ));
        }
    }

    // Get Leave History of an Employee
    @GetMapping("/history/{employeeId}")
    public ResponseEntity<?> getHistory(@PathVariable String employeeId) {
        try {
            List<LeaveRequest> leaves = leaveService.getLeaveByEmployee(employeeId);
            return ResponseEntity.ok(Map.of(
                    "status", "Success",
                    "data", leaves
            ));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status", "Error",
                    "message", "Employee not found or no leave history"
            ));
        }
    }

    // Approve Leave
    @PutMapping("/approve/{leaveId}")
    public ResponseEntity<?> approve(@PathVariable Long leaveId) {
        try {
            LeaveRequest updated = leaveService.approveLeave(leaveId);
            return ResponseEntity.ok(Map.of(
                    "status", "Success",
                    "message", "Leave approved successfully",
                    "data", updated
            ));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status", "Error",
                    "message", "Leave not found"
            ));
        }
    }

    // Reject Leave
    @PutMapping("/reject/{leaveId}")
    public ResponseEntity<?> reject(@PathVariable Long leaveId) {
        try {
            LeaveRequest updated = leaveService.rejectLeave(leaveId);
            return ResponseEntity.ok(Map.of(
                    "status", "Success",
                    "message", "Leave rejected successfully",
                    "data", updated
            ));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status", "Error",
                    "message", "Leave not found"
            ));
        }
    }

    // Get All Leaves
    @GetMapping
    public ResponseEntity<?> getAll() {
        List<LeaveRequest> leaves = leaveService.getAllLeaves();
        return ResponseEntity.ok(Map.of(
                "status", "Success",
                "data", leaves
        ));
    }

    // Get Leaves by Status
    @GetMapping("/status/{status}")
    public ResponseEntity<?> getByStatus(@PathVariable String status) {
        try {
            List<LeaveRequest> leaves = leaveService.getLeavesByStatus(status);
            return ResponseEntity.ok(Map.of(
                    "status", "Success",
                    "data", leaves
            ));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status", "Error",
                    "message", "Invalid status: " + status
            ));
        }
    }

}
