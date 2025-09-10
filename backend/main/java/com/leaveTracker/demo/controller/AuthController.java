package com.leaveTracker.demo.controller;

import com.leaveTracker.demo.dto.LoginRequest;
import com.leaveTracker.demo.model.Admin;
import com.leaveTracker.demo.model.Employee;
import com.leaveTracker.demo.repository.AdminRepository;
import com.leaveTracker.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AdminRepository adminRepo;

    @Autowired
    private EmployeeRepository employeeRepo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // 1. Check Admin
        Admin admin = adminRepo.findById(loginRequest.getId()).orElse(null);
        if (admin != null && admin.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok("ADMIN");
        }

        // 2. Check Employee
        Employee emp = employeeRepo.findById(loginRequest.getId()).orElse(null);
        if (emp != null && emp.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok("EMPLOYEE");
        }

        // 3. Invalid
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
