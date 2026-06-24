package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.TelemetryData;
import com.example.demo.entity.Vehicle;

@Repository
public interface TelemetryDataRepository extends JpaRepository<TelemetryData,Long>{
    List<TelemetryData> findByVehicleOrderByRecordedAtDesc(Vehicle vehicle);
    void deleteByVehicle(Vehicle vehicle);
}
