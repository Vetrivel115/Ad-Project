package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.SystemUser;
import com.example.demo.entity.UserRole;
import com.example.demo.repository.SystemUserRepository;

@Service
public class UserService {

    private final SystemUserRepository systemUserRepository;

    public UserService(SystemUserRepository systemUserRepository) {
        this.systemUserRepository = systemUserRepository;
    }

    public List<SystemUser> getTechnicians() {

        return systemUserRepository.findByRole(
            UserRole.MAINTENANCE_TECH
        );
    }
}