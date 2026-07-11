package com.example.demo.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.demo.entity.TelemetryData;
import com.example.demo.entity.Vehicle;
import com.example.demo.repository.TelemetryRepository;
import com.example.demo.repository.VehicleRepository;

@Service
public class MonitoringService {

    private VehicleRepository vehicleRepo;
    private TelemetryRepository telemetryRepo;

    public MonitoringService(VehicleRepository vehicleRepo,
                             TelemetryRepository telemetryRepo) {
        this.vehicleRepo = vehicleRepo;
        this.telemetryRepo = telemetryRepo;
    }

    public List<Map<String, Object>> getLiveFleetStatus() {

        List<Map<String, Object>> fleetStatus = new ArrayList<>();

        List<Vehicle> vehicles = vehicleRepo.findAll();

        for (Vehicle vehicle : vehicles) {

            Map<String, Object> map = new HashMap<>();

            map.put("vehicleId", vehicle.getId());
            map.put("vin", vehicle.getVin());
            map.put("licensePlate", vehicle.getLicensePlate());
            map.put("model", vehicle.getModel());
            map.put("currentMileage", vehicle.getCurrentMileage());
            map.put("status", vehicle.getStatus());

            TelemetryData telemetry = telemetryRepo
                    .findTopByVehicleIdOrderByRecordedAtDesc(vehicle.getId())
                    .orElse(null);

            if (telemetry != null) {
                map.put("latitude", telemetry.getLatitude());
                map.put("longitude", telemetry.getLongitude());
                map.put("speed", telemetry.getSpeed());
                map.put("fuelLevel", telemetry.getFuelLevel());
            }

            fleetStatus.add(map);
        }

        return fleetStatus;
    }
}