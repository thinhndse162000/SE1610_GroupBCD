package com.bcd.ejournal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.bcd.ejournal.domain.dto.request.JournalSearchRequest;
import com.bcd.ejournal.domain.entity.Journal;

public interface JournalRepository extends CrudRepository<Journal, Integer> {
    Iterable<Journal> findByNameContains(String name);
    
    @Query("SELECT j FROM Journal j "
            + "JOIN j.issue is "
            + "JOIN j.paper pa " 
            + "WHERE j.journalId = :#{#req.journalId}  "
            + "AND (:#{#req.issueId} is null OR is.issueId = :#{#req.issueId})"
            + "AND (:#{#req.paperId} is null OR pa.paperId = :#{#req.paperId})"
            )
    List<Journal> searchRequest(JournalSearchRequest req);
}
