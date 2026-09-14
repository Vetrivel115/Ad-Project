package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.dto.DriverSummaryDto;
import com.example.demo.entity.SystemUser;
import com.example.demo.entity.UserRole;
import com.example.demo.repository.DriverRepository;
import com.example.demo.repository.SystemUserRepository;

@Service
public class UserService {

    private final SystemUserRepository systemUserRepository;
    private final DriverRepository driverRepository;

    public UserService(
        SystemUserRepository systemUserRepository,
        DriverRepository driverRepository
    ) {
        this.systemUserRepository = systemUserRepository;
        this.driverRepository = driverRepository;
    }

    public List<SystemUser> getTechnicians() {

        return systemUserRepository.findByRole(
            UserRole.MAINTENANCE_TECH
        );
    }

    public List<DriverSummaryDto> getDrivers() {

        return driverRepository.findAll()
            .stream()
            .filter(driver ->
                driver.getUser() != null &&
                driver.getUser().getRole() == UserRole.DRIVER
            )
            .map(driver -> new DriverSummaryDto(
                driver.getId(),
                driver.getUser().getId(),
                driver.getUser().getUsername(),
                driver.getUser().getEmail(),
                driver.getUser().getRole(),
                driver.getStatus()
            ))
            .collect(Collectors.toList());
    }
}