package com.bcd.ejournal.repository;

import com.bcd.ejournal.domain.entity.Invitation;
import com.bcd.ejournal.domain.enums.InvitationStatus;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface InvitationRepository extends CrudRepository<Invitation, Integer> {
    @Query(value = "SELECT i FROM Invitation i WHERE i.InvitationID = :Id AND i.ReviewerID = :reviewerID", nativeQuery = true)
    Optional<Invitation> findByIdAndReviewerId(Integer Id, Integer reviewerID);

    @Query(value = "SELECT i FROM Invitation i WHERE i.paperID = :paperId and status LIKE :#{status.name()}", nativeQuery = true)
    Iterable<Invitation> findByPaperIdAndStatus(Integer paperId, InvitationStatus status);
}
