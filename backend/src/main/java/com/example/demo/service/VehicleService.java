package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.repository.VehicleRepository;

@Service
public class VehicleService {
    private VehicleRepository vehicleRepo;

    public VehicleService() {
    }

    public VehicleService(VehicleRepository vehicleRepo) {
        this.vehicleRepo = vehicleRepo;
    }
    
    
}
