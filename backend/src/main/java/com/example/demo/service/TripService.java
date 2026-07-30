package com.example.demo.service;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Driver;
import com.example.demo.entity.DriverStatus;
import com.example.demo.entity.Trip;
import com.example.demo.entity.TripStatus;
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

    public Trip startTrip(Long vehicleID, Long driverId) {

    System.out.println("========== TripService reached ==========");
    System.out.println("Vehicle ID = " + vehicleID);
    System.out.println("Driver ID = " + driverId);

    Vehicle vehicle = vehicleRepo.findById(vehicleID)
            .orElseThrow(() -> new ResourceNotFoundException("Vehicle Not Found"));

    Driver driver = driverRepo.findById(driverId)
            .orElseThrow(() -> new ResourceNotFoundException("Driver Not Found"));

    System.out.println("Vehicle Status = " + vehicle.getStatus());
    System.out.println("Driver Status = " + driver.getStatus());

    if (vehicle.getStatus() != VehicleStatus.AVAILABLE ||
        driver.getStatus() != DriverStatus.AVAILABLE) {
        throw new IllegalStateException("Not Available");
    }

    vehicle.setStatus(VehicleStatus.ON_TRIP);
    driver.setStatus(DriverStatus.ON_TRIP);

    vehicleRepo.save(vehicle);
    driverRepo.save(driver);

    Trip trip = new Trip();
    trip.setVehicle(vehicle);
    trip.setDriver(driver);
    trip.setStatus(TripStatus.ACTIVE);
    trip.setStartTime(LocalDateTime.now());

    return tripRepo.save(trip);
}

    public Trip endTrip(Long TripId,Double distance){
        Trip trip = tripRepo.findById(TripId).orElseThrow(()-> new ResourceNotFoundException("Trip Not Found"));
        Vehicle vehicle = trip.getVehicle();
        Driver driver = trip.getDriver();
        driver.setStatus(DriverStatus.AVAILABLE);
        vehicle.setStatus(VehicleStatus.AVAILABLE);
        if(vehicle.getCurrentMileage()==null){
            vehicle.setCurrentMileage(0.0);
        }
        vehicle.setCurrentMileage(vehicle.getCurrentMileage()+distance);
        trip.setStatus(TripStatus.COMPLETED);
        trip.setEndTime(LocalDateTime.now());   
        trip.setDistanceCovered(distance);
        vehicleRepo.save(vehicle);
        driverRepo.save(driver);
        return tripRepo.save(trip);
    }
}
