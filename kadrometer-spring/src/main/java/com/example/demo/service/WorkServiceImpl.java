package com.example.demo.service;

import com.example.demo.entitie.Work;
import com.example.demo.repositories.WorkRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class WorkServiceImpl implements WorkService {
    private final WorkRepo workRepo;

    @Override
    public Work findWorksWithMissingEndHourForEmail(String email) {
        return workRepo.findWorksWithMissingEndHourForEmail(email);
    }

    @Override
    public List<Work> getAllWorks() {
        return workRepo.findAll();
    }

    @Override
    public Optional<Work> getWorkById(Integer workId) {
        return workRepo.findById(workId);
    }

    @Override
    public Work createWork(Work work) {
        return workRepo.save(work);
    }

    @Override
    public Work updateWork(Integer workId, Work work) {
        return workRepo.findById(workId).map(existingWork -> {
            Optional.ofNullable(work.getStartDate()).ifPresent(existingWork::setStartDate);
            Optional.ofNullable(work.getEndDate()).ifPresent(existingWork::setEndDate);
            Optional.ofNullable(work.getStage()).ifPresent(existingWork::setStage);
            Optional.ofNullable(work.getStartHour()).ifPresent(existingWork::setStartHour);
            Optional.ofNullable(work.getEndHour()).ifPresent(existingWork::setEndHour);
            return workRepo.save(existingWork);
        }).orElse(null);
    }

    @Override
    public List<Work> getAllWorksForUser(Integer accountId) {
        return workRepo.findAllByAccount_AccountId(accountId);
    }

    @Override
    public List<Work> getAllWorksForUser(String email) {
        return workRepo.findAllByAccountUserEmail(email);
    }

    @Override
    public void deleteWork(Integer workId) {
        workRepo.deleteById(workId);
    }
}
