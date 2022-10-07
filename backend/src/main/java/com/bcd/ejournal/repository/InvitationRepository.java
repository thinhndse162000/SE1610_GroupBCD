package com.bcd.ejournal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.bcd.ejournal.domain.entity.Invitation;
import com.bcd.ejournal.domain.enums.InvitationStatus;

public interface InvitationRepository extends CrudRepository<Invitation, Integer> {
    @Query(value = "SELECT i FROM Invitation i WHERE i.InvitationID = :Id AND i.ReviewerID = :reviewerID", nativeQuery = true)
    Optional<Invitation> findByIdAndReviewerId(Integer Id, Integer reviewerID);

    @Query(value = "SELECT i FROM Invitation i WHERE i.paperID = :paperId and status LIKE :status.name", nativeQuery = true)
    List<Invitation> findByPaperIdAndStatus(@Param("paperId") Integer paperId, @Param("status") InvitationStatus status);
}
