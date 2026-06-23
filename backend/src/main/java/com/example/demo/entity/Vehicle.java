package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(unique = true,nullable = false,length = 17)
    private String vin;

    @Column(name = "license_plate",unique = true,nullable = false)
    private String licensePlate;

    @Column(nullable = false)
    private String model;

    @Enumerated
    @Column(nullable = false)
    private VehicleStatus status;

    @Column(name = "")
    private Double currentMileage;
}