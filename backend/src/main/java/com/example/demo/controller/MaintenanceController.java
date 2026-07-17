package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.MaintenanceLog;
import com.example.demo.service.MaintenanceService;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController {

    private final MaintenanceService maintenanceService;

    public MaintenanceController(MaintenanceService maintenanceService) {
        this.maintenanceService = maintenanceService;
    }

    @GetMapping
    public ResponseEntity<List<MaintenanceLog>> getAllLogs() {
        return ResponseEntity.status(200).body(maintenanceService.getAllLogs());
    }

    @PostMapping
    public ResponseEntity<MaintenanceLog> logMaintenance(@RequestBody MaintenanceLog maintenanceLog) {

        return ResponseEntity.status(200).body(maintenanceService.logMaintenance(maintenanceLog));
    }

}