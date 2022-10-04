package com.bcd.ejournal.repository;

import com.bcd.ejournal.domain.entity.Invitation;
import com.bcd.ejournal.domain.enums.InvitationStatus;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface InvitationRepository extends CrudRepository<Invitation, Integer> {
    @Query(value = "SELECT * FROM Invitation i WHERE i.InvitationID = :Id AND i.ReviewerID = :reviewerID", nativeQuery = true)
    Optional<Invitation> findByIdAndReviewerId(Integer Id, Integer reviewerID);

    @Query(value = "SELECT * FROM Invitation i WHERE i.paperID = :paperId AND i.status = :#{#status.name()}", nativeQuery = true)
    List<Invitation> findByPaperIdAndStatus(Integer paperId, InvitationStatus status);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE Invitation SET status = :#{#status.name()} WHERE paperID = :paperId", nativeQuery = true)
    void updateInvitationStatusByPaperId(Integer paperId, InvitationStatus status);
}
