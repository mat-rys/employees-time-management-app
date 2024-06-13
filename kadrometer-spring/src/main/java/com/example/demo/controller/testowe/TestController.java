package com.example.demo.controller.testowe;


import com.example.demo.entitie.Work;
import com.example.demo.service.AccountServiceImpl;
import com.example.demo.service.WorkService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/test")
public class TestController {

    private final WorkService workService;
    private final AccountServiceImpl accountService;

    @GetMapping
    public ResponseEntity<List<Work>> getAllWorks() {
        List<Work> works = workService.getAllWorks();
        return new ResponseEntity<>(works, HttpStatus.OK);
    }

    @GetMapping("SayHello")
    public String sayHello(){
        return "Hello";
    }

}
