package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Vehicle;
import com.example.demo.entity.VehicleStatus;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle,Long>{
    List<Vehicle> findByStatus(VehicleStatus status);
}