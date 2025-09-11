package com.leaveTracker.demo.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum LeaveType {
    SICK_LEAVE("Sick Leave"),
    CASUAL_LEAVE("Casual Leave"),
    WORK_FROM_HOME("Work From Home");

    private final String displayName;

    LeaveType(String displayName) {
        this.displayName = displayName;
    }

    @JsonValue
    public String getDisplayName() {
        return displayName;
    }

    @JsonCreator
    public static LeaveType fromValue(String value) {
        for (LeaveType type : LeaveType.values()) {
            if (type.displayName.equalsIgnoreCase(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Invalid LeaveType: " + value);
    }
}
