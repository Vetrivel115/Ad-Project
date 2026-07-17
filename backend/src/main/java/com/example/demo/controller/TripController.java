package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Trip;
import com.example.demo.service.TripService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/api/trips")
public class TripController {
    private TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping
    public ResponseEntity<List<Trip>> getAllTrips(){
        return ResponseEntity.status(200).body(tripService.getAllTrips());
    }

    @PostMapping("/start")
    public ResponseEntity<?> startTrip(@RequestBody Trip trip){
        return ResponseEntity.status(200).body(tripService.startTrip(trip.getId(), trip.getDriver().getId()));
    }

    @PutMapping("/{id}/end")
    public ResponseEntity<Trip> endTrip(@PathVariable Long id,@RequestBody Trip trip) {
        return ResponseEntity.status(200).body(tripService.endTrip(id, trip.getDistanceCovered()));
    }
}