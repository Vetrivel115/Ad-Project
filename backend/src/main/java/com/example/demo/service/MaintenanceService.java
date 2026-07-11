package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.MaintenanceLog;
import com.example.demo.entity.Vehicle;
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

    public List<MaintenanceLog> getAllLogs(){
        return maintenanceLogRepo.findAll();
    }
    
    public MaintenanceLog logMaintenance(MaintenanceLog log){
        Vehicle vehicle = vehicleRepo.findById(log.getId())
    }

}
