package com.bcd.ejournal.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.bcd.ejournal.domain.entity.Issue;

public interface IssueRepository extends CrudRepository<Issue, Integer> {
    @Query(value = "SELECT i from Issue i INNER JOIN i.journal j WHERE j.journalId = :journalId")
    Iterable<Issue> findAllByJournalId(Integer journalId);

    @Query(value = "SELECT i from Issue i INNER JOIN i.journal j WHERE j.slug = :slug")
    Iterable<Issue> findAllByJournalSlug(String slug);

    @Query("SELECT i FROM Issue i INNER JOIN i.journal j WHERE j.journalId = :journalId")
    Page<Issue> findFirstByJournalId(Integer journalId, Pageable pageable);

    @Query("SELECT i FROM Issue i INNER JOIN i.journal j WHERE j.slug = :slug")
    Page<Issue> findFirstByJournalSlug(String slug, Pageable pageable);

    @Query("SELECT i FROM Issue i INNER JOIN i.journal j WHERE j.journalId = :journalId AND i.volume = :volume AND i.issue = :issue")
    Optional<Issue> findByJournalIdAndVolumeAndIssue(Integer journalId, Integer volume, Integer issue);

    @Query("SELECT i FROM Issue i INNER JOIN i.journal j WHERE j.slug = :slug AND i.volume = :volume AND i.issue = :issue")
    Optional<Issue> findByJournalSlugAndVolumeAndIssue(String slug, Integer volume, Integer issue);
}
