package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "telemetry_data")
public class TelemetryData {
    @Id
    @GeneratedValue(strategy = GeneratedType.AUTO)
    

    
}