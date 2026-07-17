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
    public ResponseEntity<List<MaintenanceLog>> getAllMaintenanceLogs() {
        return ResponseEntity.ok(maintenanceService.getAllMaintenanceLogs());
    }

    @PostMapping
    public ResponseEntity<MaintenanceLog> scheduleMaintenance(
            @RequestBody MaintenanceLog maintenanceLog) {

        return ResponseEntity.ok(
                maintenanceService.scheduleMaintenance(maintenanceLog)
        );
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<MaintenanceLog> completeMaintenance(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                maintenanceService.completeMaintenance(id)
        );
    }
}