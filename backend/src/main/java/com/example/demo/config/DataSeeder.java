package com.example.demo.config;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    public DataSeeder(
            SystemUserRepository userRepo,
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

        /*
         * Prevent duplicate seed data.
         *
         * IMPORTANT:
         * If you already have old demo data in the database,
         * clear/reset the database first.
         */
        if (userRepo.count() > 0) {
            System.out.println("Existing data found. Skipping demo data seeding.");
            return;
        }

        LocalDate today = LocalDate.now();
        LocalDateTime now = LocalDateTime.now();

        // =========================================================
        // 1. USERS
        // =========================================================

        SystemUser manager1 = createUser(
                "manager",
                "admin123",
                "manager@test.com",
                UserRole.FLEET_MANAGER
        );

        SystemUser manager2 = createUser(
                "manager2",
                "admin123",
                "manager2@test.com",
                UserRole.FLEET_MANAGER
        );

        SystemUser dispatcher1 = createUser(
                "dispatcher",
                "admin123",
                "dispatcher@test.com",
                UserRole.DISPATCHER
        );

        SystemUser dispatcher2 = createUser(
                "dispatcher2",
                "admin123",
                "dispatcher2@test.com",
                UserRole.DISPATCHER
        );

        SystemUser tech1 = createUser(
                "tech1",
                "tech123",
                "tech@test.com",
                UserRole.MAINTENANCE_TECH
        );

        SystemUser tech2 = createUser(
                "tech2",
                "tech123",
                "tech2@test.com",
                UserRole.MAINTENANCE_TECH
        );

        // Driver users
        SystemUser driverUser1 = createUser(
                "driver1",
                "driver123",
                "driver@test.com",
                UserRole.DRIVER
        );

        SystemUser driverUser2 = createUser(
                "driver2",
                "driver123",
                "driver2@test.com",
                UserRole.DRIVER
        );

        SystemUser driverUser3 = createUser(
                "driver3",
                "driver123",
                "driver3@test.com",
                UserRole.DRIVER
        );

        SystemUser driverUser4 = createUser(
                "driver4",
                "driver123",
                "driver4@test.com",
                UserRole.DRIVER
        );

        SystemUser driverUser5 = createUser(
                "driver5",
                "driver123",
                "driver5@test.com",
                UserRole.DRIVER
        );

        SystemUser driverUser6 = createUser(
                "driver6",
                "driver123",
                "driver6@test.com",
                UserRole.DRIVER
        );

        // =========================================================
        // 2. DRIVERS
        // =========================================================

        Driver driver1 = createDriver(
                driverUser1,
                "DL-100001",
                DriverStatus.AVAILABLE
        );

        Driver driver2 = createDriver(
                driverUser2,
                "DL-100002",
                DriverStatus.AVAILABLE
        );

        Driver driver3 = createDriver(
                driverUser3,
                "DL-100003",
                DriverStatus.ON_TRIP
        );

        Driver driver4 = createDriver(
                driverUser4,
                "DL-100004",
                DriverStatus.ON_TRIP
        );

        Driver driver5 = createDriver(
                driverUser5,
                "DL-100005",
                DriverStatus.OFF_DUTY
        );

        Driver driver6 = createDriver(
                driverUser6,
                "DL-100006",
                DriverStatus.ON_TRIP
        );

        // =========================================================
        // 3. VEHICLES
        // =========================================================

        Vehicle vehicle1 = createVehicle(
                "1HGCM82633A00435",
                "ABC-1234",
                "Volvo FH16",
                VehicleStatus.AVAILABLE,
                15000.0
        );

        Vehicle vehicle2 = createVehicle(
                "1FM5K8F85HGA0000",
                "XYZ-5678",
                "Mercedes-Benz Actros",
                VehicleStatus.ON_TRIP,
                45000.0
        );

        Vehicle vehicle3 = createVehicle(
                "1HGCM82633A004352",
                "TN-01-AB-1234",
                "Volvo FH16",
                VehicleStatus.AVAILABLE,
                25000.0
        );

        Vehicle vehicle4 = createVehicle(
                "WDB9061551N678901",
                "TN-22-EF-9012",
                "Tata Prima 5530",
                VehicleStatus.UNDER_MAINTENANCE,
                42000.0
        );

        Vehicle vehicle5 = createVehicle(
                "1FTFW1ET5EKE12345",
                "TN-38-CD-5678",
                "Mercedes-Benz Actros",
                VehicleStatus.ON_TRIP,
                18578.0
        );

        Vehicle vehicle6 = createVehicle(
                "1N4AL3AP4FC123456",
                "TN-45-GH-2468",
                "Ashok Leyland 4825",
                VehicleStatus.AVAILABLE,
                32650.0
        );

        Vehicle vehicle7 = createVehicle(
                "JH4TB2H26CC000001",
                "TN-09-JK-1357",
                "Tata Signa 5530",
                VehicleStatus.AVAILABLE,
                19870.0
        );

        Vehicle vehicle8 = createVehicle(
                "KMHCT4AE1HU000001",
                "KA-01-MN-7890",
                "Volvo FM",
                VehicleStatus.ON_TRIP,
                52300.0
        );

        Vehicle vehicle9 = createVehicle(
                "1G1JC5SH8E4100001",
                "KL-07-PQ-4567",
                "BharatBenz 2823",
                VehicleStatus.AVAILABLE,
                28750.0
        );

        Vehicle vehicle10 = createVehicle(
                "MA1TA2AC7E2000001",
                "AP-28-RS-9012",
                "Eicher Pro 6042",
                VehicleStatus.UNDER_MAINTENANCE,
                61780.0
        );

        Vehicle vehicle11 = createVehicle(
                "MAT403217E2000001",
                "MH-12-TU-3456",
                "Ashok Leyland 4220",
                VehicleStatus.AVAILABLE,
                36420.0
        );

        Vehicle vehicle12 = createVehicle(
                "MB1AA25B3E2000001",
                "DL-05-VW-6789",
                "Tata Prima 3530",
                VehicleStatus.AVAILABLE,
                41250.0
        );

        // =========================================================
        // 4. TRIPS
        // =========================================================

        List<Trip> trips = new ArrayList<>();

        // Active trips

        trips.add(createTrip(
                vehicle2,
                driver3,
                now.minusHours(3),
                now.plusHours(2),
                TripStatus.ACTIVE,
                185.5
        ));

        trips.add(createTrip(
                vehicle5,
                driver4,
                now.minusHours(5),
                now.plusHours(1),
                TripStatus.ACTIVE,
                246.8
        ));

        trips.add(createTrip(
                vehicle8,
                driver6,
                now.minusHours(2),
                now.plusHours(3),
                TripStatus.ACTIVE,
                132.4
        ));

        // Completed trips

        trips.add(createTrip(
                vehicle1,
                driver1,
                now.minusDays(1).minusHours(6),
                now.minusDays(1).minusHours(1),
                TripStatus.COMPLETED,
                284.7
        ));

        trips.add(createTrip(
                vehicle3,
                driver2,
                now.minusDays(2).minusHours(7),
                now.minusDays(2).minusHours(2),
                TripStatus.COMPLETED,
                315.2
        ));

        trips.add(createTrip(
                vehicle6,
                driver1,
                now.minusDays(3).minusHours(5),
                now.minusDays(3),
                TripStatus.COMPLETED,
                198.6
        ));

        trips.add(createTrip(
                vehicle7,
                driver2,
                now.minusDays(4).minusHours(8),
                now.minusDays(4).minusHours(3),
                TripStatus.COMPLETED,
                421.3
        ));

        trips.add(createTrip(
                vehicle9,
                driver1,
                now.minusDays(5).minusHours(4),
                now.minusDays(5),
                TripStatus.COMPLETED,
                176.9
        ));

        trips.add(createTrip(
                vehicle11,
                driver2,
                now.minusDays(6).minusHours(6),
                now.minusDays(6).minusHours(1),
                TripStatus.COMPLETED,
                352.4
        ));

        trips.add(createTrip(
                vehicle12,
                driver1,
                now.minusDays(7).minusHours(5),
                now.minusDays(7),
                TripStatus.COMPLETED,
                267.8
        ));

        trips.add(createTrip(
                vehicle6,
                driver2,
                now.minusDays(8).minusHours(7),
                now.minusDays(8).minusHours(2),
                TripStatus.COMPLETED,
                301.6
        ));

        // Cancelled trips

        trips.add(createTrip(
                vehicle10,
                driver5,
                now.minusDays(2),
                now.minusDays(2).plusHours(1),
                TripStatus.CANCELLED,
                0.0
        ));

        trips.add(createTrip(
                vehicle7,
                driver5,
                now.minusDays(9),
                now.minusDays(9).plusHours(1),
                TripStatus.CANCELLED,
                0.0
        ));

        trips.add(createTrip(
                vehicle4,
                driver2,
                now.minusDays(10),
                now.minusDays(10).plusHours(2),
                TripStatus.CANCELLED,
                0.0
        ));

        trips.add(createTrip(
                vehicle3,
                driver1,
                now.minusDays(11),
                now.minusDays(11).plusHours(4),
                TripStatus.COMPLETED,
                389.5
        ));

        tripRepo.saveAll(trips);

        // =========================================================
        // 5. MAINTENANCE LOGS
        // =========================================================

        List<MaintenanceLog> maintenanceLogs = new ArrayList<>();

        maintenanceLogs.add(createMaintenance(
                vehicle1,
                tech1,
                today.minusDays(2),
                "Engine oil and filter replacement",
                4200.0
        ));

        maintenanceLogs.add(createMaintenance(
                vehicle2,
                tech1,
                today.minusDays(8),
                "Brake inspection and adjustment",
                6800.0
        ));

        maintenanceLogs.add(createMaintenance(
                vehicle3,
                tech2,
                today.minusDays(12),
                "Routine 10,000 km service",
                8500.0
        ));

        maintenanceLogs.add(createMaintenance(
                vehicle4,
                tech1,
                today.minusDays(1),
                "Engine diagnostics and fault inspection",
                12500.0
        ));

        maintenanceLogs.add(createMaintenance(
                vehicle4,
                tech2,
                today.minusDays(3),
                "Brake pad replacement",
                18500.0
        ));

        maintenanceLogs.add(createMaintenance(
                vehicle5,
                tech1,
                today.minusDays(15),
                "Tyre rotation and wheel alignment",
                5600.0
        ));

        maintenanceLogs.add(createMaintenance(
                vehicle6,
                tech2,
                today.minusDays(20),
                "Battery inspection",
                2800.0
        ));

        maintenanceLogs.add(createMaintenance(
                vehicle7,
                tech1,
                today.minusDays(18),
                "Coolant replacement",
                3900.0
        ));

        maintenanceLogs.add(createMaintenance(
                vehicle8,
                tech2,
                today.minusDays(6),
                "Transmission inspection",
                14800.0
        ));

        maintenanceLogs.add(createMaintenance(
                vehicle9,
                tech1,
                today.minusDays(10),
                "Air filter replacement",
                2100.0
        ));

        maintenanceLogs.add(createMaintenance(
                vehicle10,
                tech2,
                today.minusDays(1),
                "Major engine service",
                32500.0
        ));

        maintenanceLogs.add(createMaintenance(
                vehicle10,
                tech1,
                today.minusDays(4),
                "Fuel system cleaning",
                7600.0
        ));

        maintenanceLogs.add(createMaintenance(
                vehicle11,
                tech1,
                today.minusDays(25),
                "Preventive maintenance",
                6200.0
        ));

        maintenanceLogs.add(createMaintenance(
                vehicle12,
                tech2,
                today.minusDays(14),
                "Suspension inspection",
                9800.0
        ));

        maintenanceLogs.add(createMaintenance(
                vehicle1,
                tech2,
                today.minusDays(30),
                "Full vehicle inspection",
                4800.0
        ));

        maintenanceLogs.add(createMaintenance(
                vehicle3,
                tech1,
                today.minusDays(35),
                "Oil change and lubrication",
                3600.0
        ));

        maintenanceLogs.add(createMaintenance(
                vehicle8,
                tech1,
                today.minusDays(40),
                "Brake system inspection",
                7200.0
        ));

        maintenanceLogs.add(createMaintenance(
                vehicle11,
                tech2,
                today.minusDays(45),
                "Tyre replacement",
                22000.0
        ));

        maintenanceRepo.saveAll(maintenanceLogs);

        // =========================================================
        // 6. TELEMETRY DATA
        // =========================================================

        List<TelemetryData> telemetryList = new ArrayList<>();

        // Vehicle 1
        telemetryList.add(createTelemetry(
                vehicle1,
                13.0827,
                80.2707,
                0.0,
                87.0,
                80.0,
                now.minusMinutes(6)
        ));

        telemetryList.add(createTelemetry(
                vehicle1,
                13.0831,
                80.2710,
                0.0,
                86.5,
                79.0,
                now.minusMinutes(2)
        ));

        // Vehicle 2
        telemetryList.add(createTelemetry(
                vehicle2,
                12.9716,
                77.5946,
                62.5,
                70.0,
                85.0,
                now.minusMinutes(12)
        ));

        telemetryList.add(createTelemetry(
                vehicle2,
                12.9750,
                77.5990,
                64.8,
                69.0,
                86.0,
                now.minusMinutes(3)
        ));

        // Vehicle 3
        telemetryList.add(createTelemetry(
                vehicle3,
                13.0475,
                80.2090,
                45.2,
                82.0,
                81.0,
                now.minusMinutes(8)
        ));

        telemetryList.add(createTelemetry(
                vehicle3,
                13.0490,
                80.2112,
                48.7,
                81.0,
                82.0,
                now.minusMinutes(1)
        ));

        // Vehicle 4 - maintenance
        telemetryList.add(createTelemetry(
                vehicle4,
                13.0827,
                80.2707,
                0.0,
                34.0,
                72.0,
                now.minusHours(5)
        ));

        // Vehicle 5
        telemetryList.add(createTelemetry(
                vehicle5,
                10.7905,
                78.7047,
                71.4,
                64.0,
                88.0,
                now.minusMinutes(10)
        ));

        telemetryList.add(createTelemetry(
                vehicle5,
                10.7932,
                78.7080,
                68.9,
                63.0,
                87.5,
                now.minusMinutes(4)
        ));

        // Vehicle 6
        telemetryList.add(createTelemetry(
                vehicle6,
                11.0168,
                76.9558,
                0.0,
                76.0,
                80.0,
                now.minusMinutes(11)
        ));

        telemetryList.add(createTelemetry(
                vehicle6,
                11.0180,
                76.9570,
                0.0,
                75.0,
                79.0,
                now.minusMinutes(2)
        ));

        // Vehicle 7
        telemetryList.add(createTelemetry(
                vehicle7,
                12.9165,
                79.1325,
                38.5,
                58.0,
                82.0,
                now.minusMinutes(14)
        ));

        telemetryList.add(createTelemetry(
                vehicle7,
                12.9180,
                79.1348,
                41.7,
                57.0,
                83.0,
                now.minusMinutes(5)
        ));

        // Vehicle 8
        telemetryList.add(createTelemetry(
                vehicle8,
                12.2958,
                76.6394,
                55.7,
                76.0,
                83.0,
                now.minusMinutes(9)
        ));

        telemetryList.add(createTelemetry(
                vehicle8,
                12.2980,
                76.6415,
                59.1,
                75.0,
                84.0,
                now.minusMinutes(2)
        ));

        // Vehicle 9
        telemetryList.add(createTelemetry(
                vehicle9,
                9.9312,
                76.2673,
                42.8,
                91.0,
                79.0,
                now.minusMinutes(15)
        ));

        // Vehicle 10 - maintenance
        telemetryList.add(createTelemetry(
                vehicle10,
                17.3850,
                78.4867,
                0.0,
                28.0,
                70.0,
                now.minusHours(4)
        ));

        // Vehicle 11
        telemetryList.add(createTelemetry(
                vehicle11,
                19.0760,
                72.8777,
                52.4,
                69.0,
                84.0,
                now.minusMinutes(13)
        ));

        telemetryList.add(createTelemetry(
                vehicle11,
                19.0785,
                72.8800,
                50.8,
                68.0,
                83.0,
                now.minusMinutes(3)
        ));

        // Vehicle 12
        telemetryList.add(createTelemetry(
                vehicle12,
                28.6139,
                77.2090,
                47.6,
                73.0,
                81.0,
                now.minusMinutes(7)
        ));

        telemetryList.add(createTelemetry(
                vehicle12,
                28.6155,
                77.2120,
                49.2,
                72.0,
                82.0,
                now.minusMinutes(1)
        ));

        telemetryRepo.saveAll(telemetryList);

        // =========================================================
        // 7. CONSOLE SUMMARY
        // =========================================================

        System.out.println();
        System.out.println("==============================================");
        System.out.println("       FLEETFOCUS DEMO DATA SEEDED");
        System.out.println("==============================================");
        System.out.println("Users           : " + userRepo.count());
        System.out.println("Drivers         : " + driverRepo.count());
        System.out.println("Vehicles        : " + vehicleRepo.count());
        System.out.println("Trips           : " + tripRepo.count());
        System.out.println("Maintenance     : " + maintenanceRepo.count());
        System.out.println("Telemetry       : " + telemetryRepo.count());
        System.out.println("==============================================");
        System.out.println();
        System.out.println("LOGIN CREDENTIALS");
        System.out.println("----------------------------------------------");
        System.out.println("Manager      : manager / admin123");
        System.out.println("Manager 2    : manager2 / admin123");
        System.out.println("Dispatcher   : dispatcher / admin123");
        System.out.println("Dispatcher 2 : dispatcher2 / admin123");
        System.out.println("Technician   : tech1 / tech123");
        System.out.println("Technician 2 : tech2 / tech123");
        System.out.println("Driver 1     : driver1 / driver123");
        System.out.println("Driver 2     : driver2 / driver123");
        System.out.println("Driver 3     : driver3 / driver123");
        System.out.println("Driver 4     : driver4 / driver123");
        System.out.println("Driver 5     : driver5 / driver123");
        System.out.println("Driver 6     : driver6 / driver123");
        System.out.println("==============================================");
    }

    // =============================================================
    // HELPER METHODS
    // =============================================================

    private SystemUser createUser(
            String username,
            String rawPassword,
            String email,
            UserRole role) {

        SystemUser user = new SystemUser();

        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setEmail(email);
        user.setRole(role);

        return userRepo.save(user);
    }

    private Driver createDriver(
            SystemUser user,
            String licenseNumber,
            DriverStatus status) {

        Driver driver = new Driver();

        driver.setUser(user);
        driver.setLicenseNumber(licenseNumber);
        driver.setStatus(status);

        return driverRepo.save(driver);
    }

    private Vehicle createVehicle(
            String vin,
            String licensePlate,
            String model,
            VehicleStatus status,
            Double mileage) {

        Vehicle vehicle = new Vehicle();

        vehicle.setVin(vin);
        vehicle.setLicensePlate(licensePlate);
        vehicle.setModel(model);
        vehicle.setStatus(status);
        vehicle.setCurrentMileage(mileage);

        return vehicleRepo.save(vehicle);
    }

    private Trip createTrip(
            Vehicle vehicle,
            Driver driver,
            LocalDateTime startTime,
            LocalDateTime endTime,
            TripStatus status,
            Double distanceCovered) {

        Trip trip = new Trip();

        trip.setVehicle(vehicle);
        trip.setDriver(driver);
        trip.setStartTime(startTime);
        trip.setEndTime(endTime);
        trip.setStatus(status);
        trip.setDistanceCovered(distanceCovered);

        return trip;
    }

    private MaintenanceLog createMaintenance(
            Vehicle vehicle,
            SystemUser technician,
            LocalDate serviceDate,
            String description,
            Double cost) {

        MaintenanceLog log = new MaintenanceLog();

        log.setVehicle(vehicle);
        log.setSystemUser(technician);
        log.setServiceDate(serviceDate);
        log.setDescription(description);
        log.setCost(cost);

        return log;
    }

    private TelemetryData createTelemetry(
            Vehicle vehicle,
            Double latitude,
            Double longitude,
            Double speed,
            Double fuelLevel,
            Double engineTemp,
            LocalDateTime recordedAt) {

        TelemetryData telemetry = new TelemetryData();

        telemetry.setVehicle(vehicle);
        telemetry.setLatitude(latitude);
        telemetry.setLongitude(longitude);
        telemetry.setSpeed(speed);
        telemetry.setFuelLevel(fuelLevel);
        telemetry.setEngineTemp(engineTemp);
        telemetry.setRecordedAt(recordedAt);

        return telemetry;
    }
}