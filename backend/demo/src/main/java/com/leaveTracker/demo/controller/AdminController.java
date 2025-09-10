package com.leaveTracker.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.leaveTracker.demo.dto.ChangePasswordRequest;
import com.leaveTracker.demo.model.Admin;
import com.leaveTracker.demo.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend requests from React
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PutMapping("/{id}/change-password")
    public ResponseEntity<?> changeAdminPassword(
            @PathVariable String id,
            @RequestBody ChangePasswordRequest request) {

        Admin admin = adminService.findById(id);
        if (admin == null) {
            return ResponseEntity.badRequest().body("Admin not found with ID: " + id);
        }

        String oldPasswordInput = request.getOldPassword().trim();
        String newPasswordInput = request.getNewPassword().trim();
        String confirmPasswordInput = request.getConfirmPassword().trim();

        if (!admin.getPassword().trim().equals(oldPasswordInput)) {
            return ResponseEntity.badRequest().body("Old password is incorrect");
        }

        if (!newPasswordInput.equals(confirmPasswordInput)) {
            return ResponseEntity.badRequest().body("Passwords do not match");
        }

        admin.setPassword(newPasswordInput);
        adminService.save(admin);

        return ResponseEntity.ok("Admin password updated successfully");
    }
}
