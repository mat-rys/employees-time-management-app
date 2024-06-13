package com.example.demo.controller;

import com.example.demo.entitie.Account;
import com.example.demo.security.jwt.AuthenticationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(MockitoExtension.class)
class SecurityRestControllerTest {

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthenticationService authenticationService;

    @Test
    void getRole() {
    }

    @Test
    void login() throws Exception {
        String loginJson = "{\"userEmail\":\"ttt@wp.pl\", \"userPassword\":\"ttt\"}";
        System.out.println("Rozpoczynam test logowania...");
        var result = mockMvc.perform(MockMvcRequestBuilders.post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginJson))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        String response = result.getResponse().getContentAsString();
        System.out.println("Odpowiedź serwera: " + response);
        assertTrue(response.contains("token"));
        System.out.println("Test logowania zakończony sukcesem!");
    }


    @Test
    void register() throws Exception {
        String registerJson = "{\"userEmail\":\"ttt@wp.pl\", \"userPassword\":\"ttt\"}";

        System.out.println("Rozpoczynam test rejestracji...");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registerJson))
                .andExpect(MockMvcResultMatchers.status().isOk());

        verify(authenticationService, times(1)).register(new Account("kkk@wp.pl", "kkk"));

        System.out.println("Test rejestracji zakończony sukcesem!");

    }
}