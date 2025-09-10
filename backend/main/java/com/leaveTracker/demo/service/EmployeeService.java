package com.leaveTracker.demo.service;

import com.leaveTracker.demo.model.Employee;
import com.leaveTracker.demo.repository.EmployeeRepository;
import com.leaveTracker.demo.dto.ChangePasswordRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Create employee (save password as plain text)
    public Employee createEmployee(Employee emp) {
        return employeeRepository.save(emp);
    }

    // Get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get employee by ID
    public Optional<Employee> getEmployeeById(String id) {
        return employeeRepository.findById(id);
    }

    // Update employee (keep password plain text)
    public Employee updateEmployee(String id, Employee updateEmp) {
        return employeeRepository.findById(id)
                .map(emp -> {
                    if (updateEmp.getName() != null) {
                        emp.setName(updateEmp.getName());
                    }
                    if (updateEmp.getEmail() != null) {
                        emp.setEmail(updateEmp.getEmail());
                    }
                    if (updateEmp.getPassword() != null) {
                        emp.setPassword(updateEmp.getPassword()); // no hashing
                    }
                    return employeeRepository.save(emp);
                })
                .orElseThrow(() -> new IllegalArgumentException("Employee not found with ID: " + id));
    }

    // Change password (plain text check + save)
    public boolean changePassword(String id, ChangePasswordRequest request) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found with ID: " + id));

        // Verify old password
        if (!employee.getPassword().equals(request.getOldPassword())) {
            throw new IllegalArgumentException("Old password is incorrect");
        }

        // Confirm password check
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("New password and confirm password do not match");
        }

        // Save new plain password
        employee.setPassword(request.getNewPassword());
        employeeRepository.save(employee);
        return true;
    }

    // Delete employee
    public void deleteEmployee(String id) {
        if (!employeeRepository.existsById(id)) {
            throw new IllegalArgumentException("Employee not found with ID: " + id);
        }
        employeeRepository.deleteById(id);
    }

    // Authentication (login check with plain text)
    public boolean authenticateEmployee(String id, String rawPassword) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        if (optionalEmployee.isEmpty()) {
            return false; // Employee not found
        }
        Employee employee = optionalEmployee.get();
        return rawPassword.equals(employee.getPassword()); // plain compare
    }
}
