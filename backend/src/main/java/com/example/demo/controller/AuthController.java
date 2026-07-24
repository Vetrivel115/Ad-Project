package com.example.demo.controller;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
 
import com.example.demo.dto.AuthRequestDto;
import com.example.demo.service.AuthService;

 
@RestController
@RequestMapping("/auth")
public class AuthController {
 
    @Autowired
    AuthService authService;
 
    // @PostMapping("/login")
    // public ResponseEntity<String> login(@RequestBody LoginRequest request,HttpServletRequest req){
    //     return ResponseEntity.ok(authService.login(request,req));
    // }
    @PostMapping("/login")
    public String login(@RequestBody AuthRequestDto request) {
        return authService.authenticate(request);
        // return ResponseEntity.ok(new LoginResponse(token));
    }
 
}