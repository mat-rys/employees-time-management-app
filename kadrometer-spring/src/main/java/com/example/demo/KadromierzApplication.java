package com.example.demo;

import com.example.demo.jwt.RsaKeyProperties;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableConfigurationProperties(RsaKeyProperties.class)
public class KadromierzApplication {

	public static void main(String[] args) {
		SpringApplication.run(KadromierzApplication.class, args);
	}


}
