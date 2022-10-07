package com.bcd.ejournal.repository;

import com.bcd.ejournal.domain.entity.Invitation;
import com.bcd.ejournal.domain.enums.InvitationStatus;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface InvitationRepository extends CrudRepository<Invitation, Integer> {
    @Query(value = "SELECT * FROM Invitation i WHERE i.InvitationId = :Id AND i.ReviewerId = :reviewerId", nativeQuery = true)
    Optional<Invitation> findByIdAndReviewerId(Integer Id, Integer reviewerId);

    @Query(value = "SELECT * FROM Invitation i WHERE i.paperId = :paperId AND i.status = :#{#status.name()}", nativeQuery = true)
    List<Invitation> findByPaperIdAndStatus(Integer paperId, InvitationStatus status);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE Invitation SET status = :#{#status.name()} WHERE paperId = :paperId AND status = 'PENDING'", nativeQuery = true)
    void updateInvitationStatusByPaperId(Integer paperId, InvitationStatus status);
}
