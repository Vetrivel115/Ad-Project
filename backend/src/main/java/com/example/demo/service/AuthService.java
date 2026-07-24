package com.example.demo.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.demo.dto.AuthRequestDto;
import com.example.demo.config.JwtService;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;
    public String login(AuthRequestDto request) {
        Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getUsername(),
                                request.getPassword()
                        ));
        // SecurityContextHolder.getContext().setAuthentication(authentication);
        // HttpSession session = httpRequest.getSession(true);
        // System.out.println("Session ID: " + session.getId());
        // session.setAttribute(
        //         HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
        //         SecurityContextHolder.getContext()
        // );
        UserDetails us=(UserDetails)authentication.getPrincipal();
        return jwtService.generateToken(us);
        // return "Login Successful";
    }
}