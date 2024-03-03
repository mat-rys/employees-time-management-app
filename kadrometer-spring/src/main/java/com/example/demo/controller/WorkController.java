package com.example.demo.controller;

import com.example.demo.entitie.Account;
import com.example.demo.entitie.Work;
import com.example.demo.service.AccountServiceImpl;
import com.example.demo.service.WorkService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/works")
@CrossOrigin("*")
public class WorkController {
    private final WorkService workService;
    private final AccountServiceImpl accountService;


    @GetMapping("/missingEndHour")
    public ResponseEntity<Work> getWorksWithMissingEndHourForEmail(Principal principal) {
        Work works = workService.findWorksWithMissingEndHourForEmail(principal.getName());
        return new ResponseEntity<>(works, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Work>> getAllWorks() {
        List<Work> works = workService.getAllWorks();
        return new ResponseEntity<>(works, HttpStatus.OK);
    }

    @GetMapping("/{workId}")
    public ResponseEntity<Work> getWorkById(@PathVariable Integer workId) {
        return workService.getWorkById(workId)
                .map(work -> new ResponseEntity<>(work, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/post")
    public ResponseEntity<Work> createWork(Principal principal, @RequestBody Work work) {
        Optional<Account> account = accountService.findByUserEmail(principal.getName());
        work.setAccount(account.get());
        Work createdWork = workService.createWork(work);
        return new ResponseEntity<>(createdWork, HttpStatus.CREATED);
    }

    @PutMapping("/{workId}")
    public ResponseEntity<Work> updateWork(@PathVariable Integer workId, @RequestBody Work work) {
        System.out.println(work);
        Work updatedWork = workService.updateWork(workId, work);
        if (updatedWork != null) {
            return new ResponseEntity<>(updatedWork, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{workId}")
    public ResponseEntity<Void> deleteWork(@PathVariable Integer workId) {
        workService.deleteWork(workId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/user/email")
    public ResponseEntity<List<Work>> getAllWorksForUser(Principal principal) {
        List<Work> works = workService.getAllWorksForUser(principal.getName());
        return new ResponseEntity<>(works, HttpStatus.OK);
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<Work>> getAllWorksForUser(@PathVariable String email) {
        List<Work> works = workService.getAllWorksForUser(email);
        return new ResponseEntity<>(works, HttpStatus.OK);
    }

    @GetMapping("/user/id/{accountId}")
    public ResponseEntity<List<Work>> getAllWorksForUser(@PathVariable Integer accountId) {
        List<Work> works = workService.getAllWorksForUser(accountId);
        return new ResponseEntity<>(works, HttpStatus.OK);
    }

//    @GetMapping("/user/id/{accountId}")
//    public ResponseEntity<List<Work>> getAllWorksForUser(@PathVariable Integer accountId) {
//        System.out.println("0"+accountId);
//        Optional<Account> account = accountService.findById(accountId);
//        System.out.println("1"+account);
//        List<Work> works = workService.getAllWorksForUser(account.get().getUserEmail());
//        System.out.println("2"+works);
//        return new ResponseEntity<>(works, HttpStatus.OK);
//    }
}
