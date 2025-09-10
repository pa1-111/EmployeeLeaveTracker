package com.leaveTracker.demo.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @Column(name = "ID")
    private String id;   // Employee ID as primary key

    @Column(name = "PASSWORD", nullable = false)
    private String password;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "EMAIL", unique = true, nullable = false)
    private String email;

    @Column(name = "GENDER")
    private String gender;

    @Column(name = "ROLE")
    private String role;

    @Column(name = "DATE_OF_JOINING", nullable = false)
    private LocalDate dateOfJoining;

    // Total leave balance
    @Column(name = "LEAVE_BALANCE", nullable = false)
    private int leaveBalance;

    // Type-wise leave counts
    @Column(name = "CASUAL_LEAVE", nullable = false)
    private int casualLeave;

    @Column(name = "SICK_LEAVE", nullable = false)
    private int sickLeave;

    @Column(name = "WORK_FROM_HOME", nullable = false)
    private int workFromHome;

    // Audit fields (optional: if your DB already has CREATED_AT, UPDATED_AT)
    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;
}
