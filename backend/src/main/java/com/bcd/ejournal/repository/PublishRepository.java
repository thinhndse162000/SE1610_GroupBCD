package com.bcd.ejournal.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.bcd.ejournal.domain.dto.request.PublishSearchFilterRequest;
import com.bcd.ejournal.domain.entity.Publish;

public interface PublishRepository extends CrudRepository<Publish, Integer> {
    @Query(value = "SELECT b FROM Publish b INNER JOIN b.paper p INNER JOIN p.journal j WHERE j.journalId = :journalId")
    List<Publish> findByJournalId(Integer journalId);

    @Query(value = "SELECT b FROM Publish b INNER JOIN b.paper p INNER JOIN p.journal j WHERE j.slug = :slug")
    List<Publish> findByJournalSlug(String slug);

    @Query("SELECT b FROM Publish b INNER JOIN b.paper p INNER JOIN p.author a WHERE a.authorId = :authorId")
    List<Publish> findByAuthorId(Integer authorId);

    @Query("SELECT b FROM Publish b INNER JOIN b.paper p INNER JOIN p.author a INNER JOIN a.account t WHERE t.slug = :slug")
    List<Publish> findByAuthorSlug(String slug);

    @Query("SELECT pu FROM Publish pu "
            + "JOIN pu.issue su "
            + "JOIN pu.paper pa "
            + "WHERE (:#{#req.issue} is null OR su.issue = :#{#req.issue}) "
            + "AND (:#{#req.volume} is null OR su.volume = :#{#req.volume})"
            + "AND (:#{#req.authorId} is null OR pa.author = :#{#req.authorId})"
            + "AND (:#{#req.title} IS NULL OR pa.title LIKE %:#{#req.title}%)")
    Page<Publish> searchByRequest(@Param(value = "req") PublishSearchFilterRequest req, Pageable page);
}
