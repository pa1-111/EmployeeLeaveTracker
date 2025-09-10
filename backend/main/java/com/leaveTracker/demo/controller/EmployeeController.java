package com.leaveTracker.demo.controller;

import com.leaveTracker.demo.model.Employee;
import com.leaveTracker.demo.service.EmployeeService;
import com.leaveTracker.demo.dto.ChangePasswordRequest;
import com.leaveTracker.demo.dto.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // ✅ Allow React frontend
@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // Create a new employee
    @PostMapping("/create")
    public ResponseEntity<?> createEmployee(@RequestBody Employee emp) {
        try {
            Employee created = employeeService.createEmployee(emp);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Get all employees
    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    // Get employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable String id) {
        try {
            Employee emp = employeeService.getEmployeeById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Employee not found with ID: " + id));
            return ResponseEntity.ok(emp);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Update employee
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable String id, @RequestBody Employee updateEmp) {
        try {
            Employee updated = employeeService.updateEmployee(id, updateEmp);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // ✅ Change password
    @PutMapping("/{id}/change-password")
    public ResponseEntity<?> changePassword(@PathVariable String id, @RequestBody ChangePasswordRequest request) {
        try {
            boolean isChanged = employeeService.changePassword(id, request);
            if (isChanged) {
                return ResponseEntity.ok("Password updated successfully");
            }
            return ResponseEntity.badRequest().body("Password update failed");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Delete employee
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable String id) {
        try {
            employeeService.deleteEmployee(id);
            return ResponseEntity.ok("Employee deleted with ID: " + id);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        boolean isValid = employeeService.authenticateEmployee(request.getId(), request.getPassword());
        if (isValid) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }


}
