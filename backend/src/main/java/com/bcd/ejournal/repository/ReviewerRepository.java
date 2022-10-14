package com.bcd.ejournal.repository;

<<<<<<< HEAD

import java.util.List;

=======
import com.bcd.ejournal.domain.entity.Reviewer;
>>>>>>> 3fadac01e5e1ab735657b1f75a080e621491e8fe
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.bcd.ejournal.domain.entity.Reviewer;

public interface ReviewerRepository extends CrudRepository<Reviewer, Integer> {
    @Query(value = "SELECT r FROM Reviewer r WHERE r.reviewerId NOT IN (SELECT r.reviewerId FROM Invitation i INNER JOIN i.reviewer r INNER JOIN i.paper p WHERE p.paperId = :paperId) AND r.invitable = 1")
    List<Reviewer> findAvailableReviewer(Integer paperId);
<<<<<<< HEAD

=======
>>>>>>> 3fadac01e5e1ab735657b1f75a080e621491e8fe
}
