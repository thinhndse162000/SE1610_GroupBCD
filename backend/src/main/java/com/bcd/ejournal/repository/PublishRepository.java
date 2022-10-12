package com.bcd.ejournal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

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
}
