package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "telemetry_data")
public class TelemetryData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "vehicle_id",nullable= false)
    private Vehicle vehicle;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(nullable = false)
    private Double speed;

    @Column(nullable = false)
    private Double fuelLevel;

    @Column(nullable = false)
    private Double engineTemp;

    @Column(nullable = false)
    private LocalDateTime recordedAt;

    public TelemetryData() {
    }

    public TelemetryData(Long id, Vehicle vehicle, Double latitude, Double longitude, Double speed, Double fuelLevel,
            Double engineTemp, LocalDateTime recordedAt) {
        this.id = id;
        this.vehicle = vehicle;
        this.latitude = latitude;
        this.longitude = longitude;
        this.speed = speed;
        this.fuelLevel = fuelLevel;
        this.engineTemp = engineTemp;
        this.recordedAt = recordedAt;
    }

    


    
}