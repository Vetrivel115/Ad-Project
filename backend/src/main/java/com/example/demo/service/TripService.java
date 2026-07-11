package com.example.demo.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Driver;
import com.example.demo.entity.DriverStatus;
import com.example.demo.entity.Trip;
import com.example.demo.entity.Vehicle;
import com.example.demo.entity.VehicleStatus;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.DriverRepository;
import com.example.demo.repository.TripRepository;
import com.example.demo.repository.VehicleRepository;

@Service
public class TripService {
    private TripRepository tripRepo;
    private VehicleRepository vehicleRepo;
    private DriverRepository driverRepo;

    
    public TripService(TripRepository tripRepo, VehicleRepository vehicleRepo, DriverRepository driverRepo) {
        this.tripRepo = tripRepo;
        this.vehicleRepo = vehicleRepo;
        this.driverRepo = driverRepo;
    }

    public List<Trip> getAllTrips(){
        return tripRepo.findAll();
    }

    public Trip startTrip(Long vehicleID,Long driverId){
        
        Vehicle vehicle = vehicleRepo.findById(vehicleID).orElseThrow(()-> new ResourceNotFoundException("Vehicle Not Found"));
        Driver driver = driverRepo.findById(driverId).orElseThrow(()-> new ResourceNotFoundException("Driver Not Found"));
        
        if(vehicle.getStatus()!=VehicleStatus.AVAILABE || driver.getStatus()!=DriverStatus.AVAILABLE){
            throw new IllegalStateException("Not Available");
        }

        vehicle.setStatus(VehicleStatus.ON_TRIP);
        driver.setStatus(DriverStatus.ON_TRIP);
        
    }
}
