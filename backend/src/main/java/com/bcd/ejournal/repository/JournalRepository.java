package com.bcd.ejournal.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
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
            + "WHERE (:#{#req.issn} is null OR su.issue like %:#{#req.issn}%)  "
            + "AND (:#{#req.introduction} is null OR j.introduction like %:#{#req.introduction}%)"
            + "AND (:#{#req.organization} is null OR j.organization like %:#{#req.organization}%)"
            + "AND (:#{#req.issn} is null OR j.issn like %:#{#req.issn}%)"
            + "AND (:#{#req.journalId} is null OR j.journalId = :#{#req.journalId})"
            )
    List<Journal> searchRequest(@Param(value ="req") JournalSearchRequest req , Pageable pageable);
}
