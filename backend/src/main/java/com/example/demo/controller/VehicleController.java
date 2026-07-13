package com.example.demo.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Vehicle;
import com.example.demo.service.TripService;
import com.example.demo.service.VehicleService;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    private VehicleService vehicleService;
    private TripService tripService;

    public VehicleController(VehicleService vehicleService, TripService tripService) {
        this.vehicleService = vehicleService;
        this.tripService = tripService;
    }

    @GetMapping
    public ResponseEntity<Page<Vehicle>> getAllVehicles(@RequestParam int page,@RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.status(200).body(vehicleService.getAllVehicles(pageable));
    }

    @GetMapping("/available")
    public ResponseEntity<List<Vehicle>> getAvailableVehicles() {
        List<Vehicle> vehicles = vehicleService.getAvailabeVehicles();
        return ResponseEntity.status(200).body(vehicles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id) {
        Vehicle vehicle = vehicleService.getVehicleById(id);
        return ResponseEntity.ok(vehicle);
    }

    @PostMapping
    public ResponseEntity<?> createVehicle(@RequestBody Vehicle v) {vehicleService.createVehicle(v);
        return ResponseEntity.status(201).body("Vehicle created successfully.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateVehicle(@PathVariable Long id,@RequestBody Vehicle v) {
        vehicleService.updateVehicle(id, v);
        return ResponseEntity.ok("Vehicle updated successfully.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.ok("Vehicle deleted successfully.");
    }
}