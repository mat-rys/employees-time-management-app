package com.example.demo.entitie;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountDTO {
    private Integer accountId;
    private String userEmail;
    private String userPassword;
    private String role;
    private String name;
    private String surname;
    private String position;

}

