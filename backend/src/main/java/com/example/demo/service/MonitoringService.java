package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.repository.TelemetryRepository;
import com.example.demo.repository.VehicleRepository;

@Service
public class MonitoringService {
    private VehicleRepository vehicleRepo;
    private TelemetryRepository telemetryRepo;

    public MonitoringService(VehicleRepository vehicleRepo, TelemetryRepository telemetryRepo) {
        this.vehicleRepo = vehicleRepo;
        this.telemetryRepo = telemetryRepo;
    }
    
    List<Map<>> 
}
