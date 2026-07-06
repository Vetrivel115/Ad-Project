package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Trip;
import com.example.demo.repository.TripRepository;

@Service
public class TripService {
    private TripRepository tripRepo;

    public TripService(TripRepository tripRepo) {
        this.tripRepo = tripRepo;
    }
    
    public List<Trip> getAllTrips(){
        return tripRepo.findAll();
    }

    public Trip startTrip(Long vehicel)
}
