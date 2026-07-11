package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Trip;
import com.example.demo.repository.DriverRepository;
import com.example.demo.repository.TripRepository;
import com.example.demo.repository.VehicleRepository;

@Service
public class TripService {
    private TripRepository tripRepo;
    private VehicleRepository vehicleRepo;
    private DriverRepository driverRepo;

    
    
    public List<Trip> getAllTrips(){
        return tripRepo.findAll();
    }
    public Trip startTrip(Long vehicleID,Long driverId){


    }
}
