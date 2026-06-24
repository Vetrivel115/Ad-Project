package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Alert;
import com.example.demo.entity.Vehicle;

@Repository
public interface AlertRepository extends JpaRepository<Alert,Long>{
    List<Alert> findByVehicle(Vehicle vehicle);
    void deleteByVehicle(Vehicle vehicle);
}