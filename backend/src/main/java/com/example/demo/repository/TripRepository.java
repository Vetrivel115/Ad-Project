package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Trip;
import com.example.demo.entity.TripStatus;
import com.example.demo.entity.Vehicle;

@Repository
public interface TripRepository extends JpaRepository<Trip,Long>{
    List<Trip> findAllByStatus(TripStatus status);
    List<Trip> findByDriverIdAndStatus(Long driverId,TripStatus status);
    void deleteByVehicle(Vehicle vehicle);
}