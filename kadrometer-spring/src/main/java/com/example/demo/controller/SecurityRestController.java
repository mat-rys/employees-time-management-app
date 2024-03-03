package com.example.demo.controller;

import com.example.demo.entitie.Account;
import com.example.demo.security.jwt.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
@CrossOrigin("*")
public class SecurityRestController {
    private final AuthenticationService authenticationService;

    @GetMapping("/role")
    public String getRole(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7); // Usuń "Bearer " ze stringa nagłówka
            String role = authenticationService.getTokenRole(token);
            return role;
        } else {
            return "Invalid Authorization Header";
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request){
        return ResponseEntity.ok(authenticationService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody Account account) {
       authenticationService.register(account);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

//    @Bean
//        //ODBLOKOWAĆ PRZY UŻYCIU DOCKER COMPOSE //API ZAKŁADA ŻE NA POCZĄTKU JUŻ JEST JAKIŚ ADMIN KTÓRY AKTYWUJE KONTA
//    CommandLineRunner commandLineRunner (){
//        return args -> {
//            authenticationService.register(new Account("admin@wp.pl","admin","ADMIN"));
//        };
//    }

}








