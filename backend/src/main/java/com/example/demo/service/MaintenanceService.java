package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.repository.MaintenanceLogRepository;
import com.example.demo.repository.VehicleRepository;

@Service
public class MaintenanceService {
    private MaintenanceLogRepository maintenanceLogRepo;
    private VehicleRepository vehicleRepo;

    public MaintenanceService(MaintenanceLogRepository maintenanceLogRepo, VehicleRepository vehicleRepo) {
        this.maintenanceLogRepo = maintenanceLogRepo;
        this.vehicleRepo = vehicleRepo;
    }

    public List<>
    

}
