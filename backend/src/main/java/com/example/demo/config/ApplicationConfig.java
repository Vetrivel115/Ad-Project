// package com.example.demo.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.AuthenticationProvider;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;

// import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

// import com.example.demo.repository.SystemUserRepository;

// @Configuration
// public class ApplicationConfig {

//     private final SystemUserRepository systemUserRepository;

//     public ApplicationConfig(SystemUserRepository systemUserRepository) {
//         this.systemUserRepository = systemUserRepository;
//     }

//     @Bean
//     public UserDetailsService userDetailsService() {
//         return username -> systemUserRepository.findByUsername(username)
//                 .orElseThrow(() -> new RuntimeException("User not found"));
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public AuthenticationProvider authenticationProvider() {

//         DaoAuthenticationProvider provider =
//                 new DaoAuthenticationProvider();

//         provider.setUserDetailsService(userDetailsService());
//         provider.setPasswordEncoder(passwordEncoder());

//         return provider;
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(
//             AuthenticationConfiguration config)
//             throws Exception {

//         return config.getAuthenticationManager();
//     }
// }