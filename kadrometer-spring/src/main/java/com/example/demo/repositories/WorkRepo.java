package com.example.demo.repositories;

import com.example.demo.entitie.Account;
import com.example.demo.entitie.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WorkRepo extends JpaRepository<Work,Integer> {
    @Query("SELECT w FROM Work w WHERE w.account.userEmail = :email AND w.endHour IS NULL")
    Work findWorksWithMissingEndHourForEmail(@Param("email") String email);

    List<Work> findAllByAccountUserEmail(String email);

    List<Work> findAllByAccount_AccountId(Integer accountId);


}
