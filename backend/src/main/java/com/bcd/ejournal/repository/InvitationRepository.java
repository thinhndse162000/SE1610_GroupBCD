package com.bcd.ejournal.repository;

import com.bcd.ejournal.domain.entity.Invitation;
import com.bcd.ejournal.domain.enums.InvitationStatus;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface InvitationRepository extends CrudRepository<Invitation, Integer> {
    @Query(value = "SELECT i FROM Invitation i INNER JOIN i.reviewer r WHERE i.invitationId = :id AND r.reviewerId = :reviewerId")
    Optional<Invitation> findByIdAndReviewerId(Integer id, Integer reviewerId);

    @Query(value = "SELECT i FROM Invitation i INNER JOIN i.paper p WHERE p.paperId = :paperId AND i.status = :#{#status.name()}")
    List<Invitation> findByPaperIdAndStatus(Integer paperId, InvitationStatus status);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE Invitation SET status = :#{#status.name()} WHERE paperId = :paperId AND status = 'PENDING'", nativeQuery = true)
    void updateInvitationStatusByPaperId(Integer paperId, InvitationStatus status);
}
