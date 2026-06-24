package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.MaintenanceLog;
import com.example.demo.entity.Vehicle;

@Repository
public interface MaintenanceLogRepository extends JpaRepository<MaintenanceLog,Long>{
    void deleteByVehicle(Vehicle vehicle);
}