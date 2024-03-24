package com.example.demo.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.entitie.Account;
import com.example.demo.repositories.AccountRepo;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class AccountServiceImpl implements AccountService {
    private final AccountRepo accountRepo;

    @Override
    public Optional<Account> findById(Integer id) {
        return accountRepo.findById(id);
    }

    @Override
    public List<Account> findUsersWithNullRole() {
        return accountRepo.findByRoleIsNull();
    }

    @Override
    public Optional<Account> findByUserEmail(String email) {
        return accountRepo.findByUserEmail(email);
    }

    @Override
    public List<Account> findAll() {
        return accountRepo.findAll();
    }


    @Override
    public void saveAccount(Account account) {
        accountRepo.save(account);
    }

    @Override
    public void deleteAccount(Account account) {
        accountRepo.delete(account);
    }

    @Override
    public Optional<Account> updateAccountData(Integer accountId, Account updatedData) {
        return accountRepo.findById(accountId).map(account -> {
            Optional.ofNullable(updatedData.getRole()).ifPresent(account::setRole);
            Optional.ofNullable(updatedData.getName()).ifPresent(account::setName);
            Optional.ofNullable(updatedData.getSurname()).ifPresent(account::setSurname);
            Optional.ofNullable(updatedData.getPosition()).ifPresent(account::setPosition);
            accountRepo.save(account);
            return account;
        });
    }



}

