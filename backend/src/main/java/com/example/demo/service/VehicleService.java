package com.example.demo.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Vehicle;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.VehicleRepository;

@Service
public class VehicleService {
    private final VehicleRepository vehicleRepo;

    public VehicleService() {
    }

    public VehicleService(VehicleRepository vehicleRepo) {
        this.vehicleRepo = vehicleRepo;
    }

    public Vehicle getVehicleById(Long id){
        return vehicleRepo.findById(id).orElseThrow(() -> new RuntimeException("Vehicle Not Found"));
    }
    
    
}
