package com.example.demo.security.jwt;

import com.example.demo.security.JpaUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@AllArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final AuthenticationService authenticationService;
    private  final JpaUserDetailsService jpaUserDetailsService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION); //Bearer eyJhb...
        final String prefix = "Bearer ";
        if (authHeader == null || !authHeader.startsWith(prefix)) {
            filterChain.doFilter(request, response); // brak nagłówka z tokenem, tylko przetwarzanie przez kolejne filtry
            return;
        }

        final String token = authHeader.substring(prefix.length());
        final String userName = authenticationService.getTokenName(token);//login

        if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) { //drugi warunek sprawdza czy użytkownik nie był już uwierzytelniony
            UserDetails userDetails = this.jpaUserDetailsService.loadUserByUsername(userName);
            if (authenticationService.isTokenValid(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null,
                                userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken); //Authentication to po prostu obiekt z danymi o uwierzytelnionym użytkowniku.
            }
        }

        filterChain.doFilter(request, response); // o tym trzeba pamiętać, aby umożliwić przetwarzanie przez kolejne filtry w łańcuchu
    }

}


