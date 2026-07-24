package com.example.demo.config;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.demo.entity.Driver;
import com.example.demo.entity.DriverStatus;
import com.example.demo.entity.MaintenanceLog;
import com.example.demo.entity.SystemUser;
import com.example.demo.entity.TelemetryData;
import com.example.demo.entity.Trip;
import com.example.demo.entity.TripStatus;
import com.example.demo.entity.UserRole;
import com.example.demo.entity.Vehicle;
import com.example.demo.entity.VehicleStatus;
import com.example.demo.repository.DriverRepository;
import com.example.demo.repository.MaintenanceLogRepository;
import com.example.demo.repository.SystemUserRepository;
import com.example.demo.repository.TelemetryDataRepository;
import com.example.demo.repository.TripRepository;
import com.example.demo.repository.VehicleRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    private final SystemUserRepository userRepo;
    private final VehicleRepository vehicleRepo;
    private final DriverRepository driverRepo;
    private final TripRepository tripRepo;
    private final MaintenanceLogRepository maintenanceRepo;
    private final TelemetryDataRepository telemetryRepo;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(SystemUserRepository userRepo,
                      VehicleRepository vehicleRepo,
                      DriverRepository driverRepo,
                      TripRepository tripRepo,
                      MaintenanceLogRepository maintenanceRepo,
                      TelemetryDataRepository telemetryRepo,
                      PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.vehicleRepo = vehicleRepo;
        this.driverRepo = driverRepo;
        this.tripRepo = tripRepo;
        this.maintenanceRepo = maintenanceRepo;
        this.telemetryRepo = telemetryRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        if (userRepo.count() > 0) {
            return;
        }

        // Users
        SystemUser manager = new SystemUser();
        manager.setUsername("manager");
        manager.setPassword(passwordEncoder.encode("admin123"));
        manager.setEmail("manager@test.com");
        manager.setRole(UserRole.FLEET_MANAGER);
        userRepo.save(manager);

        SystemUser dispatcher = new SystemUser();
        dispatcher.setUsername("dispatcher");
        dispatcher.setPassword(passwordEncoder.encode("admin123"));
        dispatcher.setEmail("dispatcher@test.com");
        dispatcher.setRole(UserRole.DISPATCHER);
        userRepo.save(dispatcher);

        SystemUser driverUser = new SystemUser();
        driverUser.setUsername("driver1");
        driverUser.setPassword(passwordEncoder.encode("driver123"));
        driverUser.setEmail("driver@test.com");
        driverUser.setRole(UserRole.DRIVER);
        userRepo.save(driverUser);

        SystemUser tech = new SystemUser();
        tech.setUsername("tech1");
        tech.setPassword(passwordEncoder.encode("tech123"));
        tech.setEmail("tech@test.com");
        tech.setRole(UserRole.MAINTENANCE_TECH);
        userRepo.save(tech);

        // Vehicles
        Vehicle vehicle1 = new Vehicle();
        vehicle1.setVin("1HGCM82633A00435");
        vehicle1.setLicensePlate("ABC-1234");
        vehicle1.setModel("Volvo FH16");
        vehicle1.setStatus(VehicleStatus.AVAILABLE);
        vehicle1.setCurrentMileage(15000.0);
        vehicleRepo.save(vehicle1);

        Vehicle vehicle2 = new Vehicle();
        vehicle2.setVin("1FM5K8F85HGA0000");
        vehicle2.setLicensePlate("XYZ-5678");
        vehicle2.setModel("Mercedes-Benz Actros");
        vehicle2.setStatus(VehicleStatus.ON_TRIP);
        vehicle2.setCurrentMileage(45000.0);
        vehicleRepo.save(vehicle2);

        // Driver
        Driver driver = new Driver();
        driver.setUser(driverUser);
        driver.setLicenseNumber("DL-12345678");
        driver.setStatus(DriverStatus.AVAILABLE);
        driverRepo.save(driver);

        // Trip
        Trip trip = new Trip();
        trip.setVehicle(vehicle2);
        trip.setDriver(driver);
        trip.setStatus(TripStatus.ACTIVE);
        trip.setStartTime(LocalDateTime.now().minusHours(2));
        trip.setEndTime(LocalDateTime.now().plusHours(2));
        trip.setDistanceCovered(120.5);
        tripRepo.save(trip);

        // Maintenance Log
        MaintenanceLog log = new MaintenanceLog();
        log.setVehicle(vehicle1);
        log.setSystemUser(tech);
        log.setServiceDate(LocalDate.now());
        log.setDescription("Initial System Check");
        log.setCost(250.0);
        maintenanceRepo.save(log);

        // Telemetry
        TelemetryData telemetry = new TelemetryData();
        telemetry.setVehicle(vehicle2);
        telemetry.setLatitude(12.9716);
        telemetry.setLongitude(77.5946);
        telemetry.setSpeed(62.5);
        telemetry.setFuelLevel(70.0);
        telemetry.setEngineTemp(85.0);
        telemetry.setRecordedAt(LocalDateTime.now());
        telemetryRepo.save(telemetry);

        System.out.println("Demo data seeded successfully.");
    }
}