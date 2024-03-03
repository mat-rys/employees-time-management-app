package com.example.demo.controller;

import com.example.demo.entitie.Account;
import com.example.demo.entitie.AccountDTO;
import com.example.demo.service.AccountServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/account")
public class AccountController {
    private final AccountServiceImpl accountServiceImpl;

    @GetMapping("/usersWithNullRole")
    public List<Account> getUsersWithNullRole() {
        return accountServiceImpl.findUsersWithNullRole();
    }

    @GetMapping("/UserPrincipal")
    public ResponseEntity<AccountDTO> getUserPrincipal(Principal principal) {
        Optional<Account> accountOptional = accountServiceImpl.findByUserEmail(principal.getName());

        if (accountOptional.isPresent()) {
            Account account = accountOptional.get();
            AccountDTO accountDTO = new AccountDTO();
            accountDTO.setAccountId(account.getAccountId());
            accountDTO.setUserEmail(account.getUserEmail());
            accountDTO.setUserPassword(account.getUserPassword());
            accountDTO.setRole(account.getRole());
            accountDTO.setName(account.getName());
            accountDTO.setSurname(account.getSurname());
            accountDTO.setPosition(account.getPosition());

            return ResponseEntity.ok(accountDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/{id}")
    public Optional<Account> getAllAccounts(@PathVariable Integer id) {
        return accountServiceImpl.findById(id);
    }

    @GetMapping("/get")
    public List<Account> getAllAccounts() {
        return accountServiceImpl.findAll();
    }

    @PutMapping("/{id}")
    public Optional<Account> updateAccountData(@PathVariable Integer id, @RequestBody Account updatedData) {
        return accountServiceImpl.updateAccountData(id, updatedData);
    }

    @DeleteMapping("/{id}")
    public void deleteAccount(@PathVariable Integer id) {
        Optional<Account> account = accountServiceImpl.findById(id);
        account.ifPresent(accountServiceImpl::deleteAccount);
    }




}
