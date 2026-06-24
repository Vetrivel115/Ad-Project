package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.SystemUser;
import com.example.demo.entity.UserRole;

@Repository
public interface SystemUserRepository extends JpaRepository<SystemUser,Long>{
    Optional<SystemUser> findByUsername(String username);
    List<SystemUser> findByRole(UserRole role);
}