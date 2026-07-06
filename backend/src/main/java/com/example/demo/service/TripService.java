package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.repository.TripRepository;

@Service
public class TripService {
    private TripRepository tripRepo;

    public TripService(TripRepository tripRepo) {
        this.tripRepo = tripRepo;
    }
    List
}
