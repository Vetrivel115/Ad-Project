package com.example.demo.service;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Vehicle;
import com.example.demo.repository.VehicleRepository;

@Service
public class VehicleService {
    private VehicleRepository vehicleRepo;

    public VehicleService(){
    }

    public VehicleService(VehicleRepository vehicleRepo) {
        this.vehicleRepo = vehicleRepo;
    }

    public Vehicle getVehicleById(Long id){
        return vehicleRepo.findById(id).orElseThrow(() -> new RuntimeException("Vehicle Not Found"));
    }
    
    public Page<Vehicle> getAllVehicles(Pageable pageable){
        return vehicleRepo.findAll(pageable);
    }

    public Vehicle createVehicle(Vehicle vehicle){
        if(vehicle.getCurrentMileage() == null){
            vehicle.setCurrentMileage(0.0);
        }
        return vehicleRepo.save(vehicle);
    }

    public Vehicle updateVehicle(Long id,Vehicle vehicleDetails){
        Vehicle vehicle = vehicleRepo.findById(id).orElseThrow(()-> new RuntimeException("Vehicle Not Found"));
        vehicle.setLicensePlate(vehicleDetails.getLicensePlate());
        vehicle.setCurrentMileage(vehicleDetails.getCurrentMileage());
        vehicle.setModel(vehicleDetails.getModel());
        vehicle.setStatus(vehicleDetails.getStatus());
        vehicle.setVin(vehicleDetails.getVin());
        vehicle.setId(id);
        return vehicleRepo.save(vehicle);
    }

    public void deleteVehicle(Long id){
        Vehicle vehicle = vehicleRepo.findById(id).orElseThrow(()-> new RuntimeException("Vehicle Not Found"));
        vehicleRepo.delete(vehicle);
    }
}
