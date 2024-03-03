package com.example.demo.service;

import com.example.demo.entitie.Account;

import java.util.List;
import java.util.Optional;

public interface AccountService {
    Optional<Account> findByUserEmail(String email);
    List<Account> findAll();

    Optional<Account> findById(Integer id); // Dodana metoda do pobierania konta po ID

    List<Account> findUsersWithNullRole();
    void saveAccount(Account account);
    void deleteAccount(Account account);
    Optional<Account> updateAccountData(Integer accountId, Account updatedData);
}
