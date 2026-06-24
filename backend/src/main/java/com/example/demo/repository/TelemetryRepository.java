package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.TelemetryData;

@Repository
public interface TelemetryRepository extends JpaRepository<TelemetryData,Long>{
    Optional<TelemetryData> findTopByVehicleId
}