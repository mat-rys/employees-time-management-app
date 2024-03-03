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
        Optional<Account> existingAccount = accountRepo.findById(accountId);

        if (existingAccount.isPresent()) {
            Account account = existingAccount.get();

            if (updatedData.getRole() != null) {
                account.setRole(updatedData.getRole());
            }
            if (updatedData.getName() != null) {
                account.setName(updatedData.getName());
            }
            if (updatedData.getSurname() != null) {
                account.setSurname(updatedData.getSurname());
            }
            if (updatedData.getPosition() != null) {
                account.setPosition(updatedData.getPosition());
            }

            accountRepo.save(account);
            return Optional.of(account);
        }
        return Optional.empty();
    }

}

