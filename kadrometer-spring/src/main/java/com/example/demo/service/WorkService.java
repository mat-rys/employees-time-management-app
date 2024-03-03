package com.example.demo.service;

import com.example.demo.entitie.Work;

import java.util.List;
import java.util.Optional;

public interface WorkService {
    Work findWorksWithMissingEndHourForEmail(String email);
    List<Work> getAllWorks();

    List<Work> getAllWorksForUser(Integer accountId);

    Optional<Work> getWorkById(Integer workId);

    Work createWork(Work work);

    Work updateWork(Integer workId, Work work);

    void deleteWork(Integer workId);
    List<Work> getAllWorksForUser(String email); // Dodaj nową metodę

}

