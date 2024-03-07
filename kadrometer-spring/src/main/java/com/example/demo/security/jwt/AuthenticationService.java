package com.example.demo.security.jwt;


import com.example.demo.controller.AuthRequest;
import com.example.demo.controller.AuthResponse;
import com.example.demo.entitie.Account;
import com.example.demo.jwt.RsaKeyProperties;
import com.example.demo.service.AccountServiceImpl;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;


@Service
@AllArgsConstructor
public class AuthenticationService  {

  private  final AccountServiceImpl accountServiceImpl;
  private final RsaKeyProperties rsaKeys;

    public void register(Account account) {
    account.setUserPassword(passwordEncoder().encode(account.getUserPassword()));
    accountServiceImpl.saveAccount(account);
  }

    public AuthResponse login(@NonNull String userEmail, @NonNull String userPassword) {
        Optional<Account> accountOptional = accountServiceImpl.findByUserEmail(userEmail);
        Account account = accountOptional.get();

        if (passwordEncoder().matches(userPassword, account.getUserPassword())) {
            System.out.println(userPassword);
            System.out.println(account.getUserPassword());
            var jwtToken = generateToken(account);
            return AuthResponse.builder().token(jwtToken).build();
        }
        else {
            return null;
        }
    }

    public AuthResponse login(AuthRequest request) {
        return login(request.getUserEmail(), request.getUserPassword());
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String userName = getTokenName(token);
        return userName.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

    public boolean isTokenExpired(String token) {
        Jwt jwt = getTokenDecoded(token);
        Instant now = Instant.now();
        Instant expiresAt = jwt.getExpiresAt();
        if(now.isAfter(expiresAt)){
            return now.isAfter(expiresAt);
        }
        return false;
    }

    public String getTokenName(String token) {
        Jwt jwt = getTokenDecoded(token);
        String name = jwt.getSubject();
        return name;

    }

    public String getTokenRole(String token) {
        Jwt jwt = getTokenDecoded(token);
        String role = jwt.getClaim("role");
        return role;

    }

    public Jwt getTokenDecoded(String token){
        return jwtDecoder().decode(token);
    }

    public String generateToken(Account account) {
        Instant now = Instant.now();
        String role = account.getRole();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.HOURS))
                .subject(account.getUserEmail())
                .claim("role", role)
                .build();
        return jwtEncoder().encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    JwtEncoder jwtEncoder() {
        JWK jwk = new RSAKey.Builder(rsaKeys.publicKey()).privateKey(rsaKeys.privateKey()).build();
        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwks);
    }

    @Bean
    JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(rsaKeys.publicKey()).build();
    }



}
