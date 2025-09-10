package com.leaveTracker.demo.service;

import com.leaveTracker.demo.model.Admin;

public interface AdminService {
    Admin findById(String id);
    Admin save(Admin admin);
}
