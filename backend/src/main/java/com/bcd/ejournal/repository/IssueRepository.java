package com.bcd.ejournal.repository;

import com.bcd.ejournal.domain.entity.Issue;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface IssueRepository extends CrudRepository<Issue, Integer> {
    @Query(value = "SELECT i from Issue i INNER JOIN i.journal j WHERE j.journalId = :journalId")
    Iterable<Issue> findAllByJournalId(Integer journalId);

    @Query(value = "SELECT i from Issue i INNER JOIN i.journal j WHERE j.slug = :slug")
    Iterable<Issue> findAllByJournalSlug(String slug);
}
