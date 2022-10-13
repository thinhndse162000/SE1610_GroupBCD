package com.bcd.ejournal.repository;

<<<<<<< HEAD
import org.springframework.data.repository.CrudRepository;

import com.bcd.ejournal.domain.entity.Reviewer;

public interface ReviewerRepository extends CrudRepository<Reviewer, Integer> {
	
	
=======
import com.bcd.ejournal.domain.entity.Reviewer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReviewerRepository extends CrudRepository<Reviewer, Integer> {
    @Query(value = "SELECT * FROM Reviewer WHERE reviewerId NOT IN (SELECT reviewerId FROM Invitation WHERE paperId = :paperId) AND Invitable = 1", nativeQuery = true)
    List<Reviewer> findAvailableReviewer(Integer paperId);
>>>>>>> fa7bc9628dcf3d0fa2ef64cf90a8ecb9602c3fb0
}
