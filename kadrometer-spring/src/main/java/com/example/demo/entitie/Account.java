    package com.example.demo.entitie;

    import com.example.demo.entitie.enums.Role;
    import com.fasterxml.jackson.annotation.JsonProperty;
    import jakarta.persistence.*;
    import jakarta.validation.constraints.Size;
    import lombok.*;

    import java.sql.Date;
    import java.util.List;

    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Getter
    @Setter
    @ToString

    @Entity
    @Table(name = "Account")
    public class Account {

        public Account(String userEmail, String userPassword, String role) {
            this.userEmail = userEmail;
            this.userPassword = userPassword;
            this.role = role;
        }

        public Account(String userEmail, String userPassword) {
            this.userEmail = userEmail;
            this.userPassword = userPassword;
        }

        public Account(String userEmail, String userPassword, String role, String name, String surname, String position) {
            this.userEmail = userEmail;
            this.userPassword = userPassword;
            this.role = role;
            this.name = name;
            this.surname = surname;
            this.position = position;
        }

        public Account(String userEmail, String userPassword, String name, String surname, String position) {
            this.userEmail = userEmail;
            this.userPassword = userPassword;
            this.name = name;
            this.surname = surname;
            this.position = position;
        }

        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE)
        @Column(name = "account_id")
        private Integer accountId;

        // @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,63}$", message = "Nieprawidłowy adres email")
        @Size(min = 3 , message = "Nazwa musi zawierać od {min} znaków!")
        @Column(name = "user_email",unique = true)
        private String userEmail;

        @Size(min = 3 , message = "Nazwa musi zawierać od {min} znaków!")
        @Column(name = "user_password")
        private String userPassword;

        private String role;
        private String name;
        private String surname;
        private String position;

        @OneToMany(mappedBy = "account") // Relacja jeden do wielu
        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // Ta adnotacja uniemożliwi serializację (służy do odczytu)
        private List<Work> works; // Lista prac związanych z tym kontem
    }
