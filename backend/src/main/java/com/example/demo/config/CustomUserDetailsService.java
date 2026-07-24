package com.example.demo.config;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.entity.SystemUser;
import com.example.demo.repository.SystemUserRepository;
 

 
@Service
public class CustomUserDetailsService implements UserDetailsService {
 
    @Autowired
    private SystemUserRepository repo;
 
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
 
        SystemUser user = repo.findByEmail(username).orElseThrow(() ->
                        new UsernameNotFoundException("User Not Found"));
        return new CustomUserDetails(user);
    }
 
}