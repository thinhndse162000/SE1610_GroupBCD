package com.bcd.ejournal.repository;

import com.bcd.ejournal.domain.entity.Reviewer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReviewerRepository extends CrudRepository<Reviewer, Integer> {
    @Query(value = "SELECT r FROM Reviewer r WHERE r.reviewerId NOT IN (SELECT r.reviewerId FROM Invitation i INNER JOIN i.reviewer r INNER JOIN i.paper p WHERE p.paperId = :paperId) AND r.invitable = 1")
    List<Reviewer> findAvailableReviewer(Integer paperId);
}
