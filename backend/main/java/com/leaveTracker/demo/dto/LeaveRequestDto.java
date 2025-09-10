package com.leaveTracker.demo.dto;

import lombok.Data;
import java.time.LocalDate;
import com.leaveTracker.demo.model.LeaveType;

@Data
public class LeaveRequestDto {
    private String employeeId;   // Example: "EMP001"
    private LeaveType leaveType; // Enum: SICK_LEAVE, CASUAL_LEAVE, WORK_FROM_HOME
    private LocalDate startDate;
    private LocalDate endDate;
    private String reason;
}
