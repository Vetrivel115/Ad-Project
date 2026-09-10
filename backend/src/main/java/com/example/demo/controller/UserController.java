package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.SystemUser;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/technicians")
    public ResponseEntity<List<SystemUser>> getTechnicians() {

        return ResponseEntity.ok(
            userService.getTechnicians()
        );
    }

    @GetMapping("/drivers")
    public ResponseEntity<List<SystemUser>> getDrivers() {

        return ResponseEntity.ok(
            userService.getDrivers()
        );
    }

}