package com.bcd.ejournal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bcd.ejournal.domain.dto.request.JournalSearchRequest;
import com.bcd.ejournal.domain.entity.Journal;

@Repository
public interface JournalRepository extends CrudRepository<Journal, Integer> {
    Iterable<Journal> findByNameContains(String name);
    
    @Query("SELECT j FROM Journal j "
            + "JOIN j.issues su "
            + "JOIN j.papers pa " 
            + "WHERE j.journalID = :#{#req.journalId}  "
            + "AND (:#{#req.issueId} is null OR su.issueID = :#{#req.issueId})"
            + "AND (:#{#req.paperId} is null OR pa.paperId = :#{#req.paperId})"
            )
    List<Journal> searchRequest(@Param(value ="req") JournalSearchRequest req);
}
