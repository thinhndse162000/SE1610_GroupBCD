package com.bcd.ejournal.repository;

import com.bcd.ejournal.domain.entity.Issue;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface IssueRepository extends CrudRepository<Issue, Integer> {
    @Query(value = "SELECT * from Issue i WHERE i.journalID = :journalID", nativeQuery = true)
    Iterable<Issue> findAllByJournalID(Integer journalID);
}
