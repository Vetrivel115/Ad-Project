package com.example.demo.dto;

import com.example.demo.entity.DriverStatus;
import com.example.demo.entity.UserRole;

public class DriverSummaryDto {

    private Long id;
    private Long userId;
    private String username;
    private String email;
    private UserRole role;
    private DriverStatus status;

    public DriverSummaryDto(
        Long id,
        Long userId,
        String username,
        String email,
        UserRole role,
        DriverStatus status
    ) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.role = role;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public UserRole getRole() {
        return role;
    }

    public DriverStatus getStatus() {
        return status;
    }
}
