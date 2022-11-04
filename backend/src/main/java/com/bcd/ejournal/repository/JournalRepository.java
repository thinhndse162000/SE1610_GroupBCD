package com.bcd.ejournal.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
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

    Optional<Journal> findBySlug(String slug);
    
    @Query("SELECT j FROM Journal j "
            + "WHERE (:#{#req.name} is null OR j.name like %:#{#req.name}%) "
            + "AND (:#{#req.introduction} is null OR j.introduction like %:#{#req.introduction}%)"
            + "AND (:fieldLength = (SELECT COUNT(*) FROM j.fields f WHERE f.fieldId IN :#{#req.fieldIds}))"
            + "AND (:#{#req.organization} is null OR j.organization like %:#{#req.organization}%)"
            + "AND (:#{#req.issn} is null OR j.issn like %:#{#req.issn}%)"
            + "AND (:#{#req.journalId} is null OR j.journalId = :#{#req.journalId})" 
            )
    Page<Journal> searchRequest(@Param(value ="req") JournalSearchRequest req, Long fieldLength, Pageable pageable);
}
