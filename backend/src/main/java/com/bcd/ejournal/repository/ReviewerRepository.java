package com.bcd.ejournal.repository;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.bcd.ejournal.domain.entity.Reviewer;

public interface ReviewerRepository extends CrudRepository<Reviewer, Integer> {
    @Query(value = "SELECT * FROM Reviewer WHERE reviewerId NOT IN (SELECT reviewerId FROM Invitation WHERE paperId = :paperId) AND Invitable = 1", nativeQuery = true)
    List<Reviewer> findAvailableReviewer(Integer paperId);

}
