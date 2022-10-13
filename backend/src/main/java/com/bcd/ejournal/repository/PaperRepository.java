package com.bcd.ejournal.repository;

import com.bcd.ejournal.domain.dto.request.PaperSearchRequest;
import com.bcd.ejournal.domain.entity.Paper;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaperRepository extends CrudRepository<Paper, Integer> {
    @Query("SELECT p FROM Paper p WHERE p.title LIKE %:title%")
    Iterable<Paper> searchByTitle(String title);

    @Query("SELECT p FROM Paper p JOIN p.journal j JOIN p.author a "
            + "WHERE (:#{#req.title} IS NULL OR p.title LIKE %:#{#req.title}%)"
            + "AND (:#{#req.journalId} IS NULL OR j.journalId = :#{#req.journalId})"
            + "AND (:#{#req.authorId} IS NULL OR a.authorId = :#{#req.authorId})"
            + "AND (:#{#req.startDate} IS NULL OR p.submitTime > :#{#req.startDate})"
            + "AND (:#{#req.status} IS NULL OR p.status = :#{#req.status})")
    List<Paper> searchAndFilter(PaperSearchRequest req, Pageable page);
}
