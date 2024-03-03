package com.example.demo.repositories;

import com.example.demo.entitie.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepo extends JpaRepository<Account,Integer>{
    Optional<Account> findByUserEmail(String userEmail);
    List<Account> findByRoleIsNull();
}
