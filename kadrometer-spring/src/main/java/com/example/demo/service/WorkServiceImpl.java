package com.example.demo.service;

import com.example.demo.entitie.Work;
import com.example.demo.repositories.WorkRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkServiceImpl implements WorkService {
    private final WorkRepo workRepo;


    @Autowired
    public WorkServiceImpl(WorkRepo workRepo) {
        this.workRepo = workRepo;
    }

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
        Optional<Work> existingWorkOptional = workRepo.findById(workId);

        if (existingWorkOptional.isPresent()) {
            Work existingWork = existingWorkOptional.get();

            if (work.getStartDate() != null) {
                existingWork.setStartDate(work.getStartDate());
            }

            if (work.getEndDate() != null) {
                existingWork.setEndDate(work.getEndDate());
            }

            if (work.getStage() != null) {
                existingWork.setStage(work.getStage());
            }

            if (work.getStartHour() != null) {
                existingWork.setStartHour(work.getStartHour());
            }

            if (work.getEndHour() != null) {
                existingWork.setEndHour(work.getEndHour());
            }

            return workRepo.save(existingWork);
        } else {
            // Tutaj możesz obsłużyć przypadek, gdy praca o podanym ID nie istnieje.
            // Na przykład rzuć wyjątek lub zwróć null.
            return null;
        }
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
