package com.bcd.ejournal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.bcd.ejournal.domain.dto.request.InvitationSearchFilterRequest;
import com.bcd.ejournal.domain.entity.Invitation;
import com.bcd.ejournal.domain.enums.InvitationStatus;

public interface InvitationRepository extends CrudRepository<Invitation, Integer> {
    @Query(value = "SELECT i FROM Invitation i INNER JOIN i.reviewer r WHERE i.invitationId = :id AND r.reviewerId = :reviewerId")
    Optional<Invitation> findByIdAndReviewerId(Integer id, Integer reviewerId);

    @Query(value = "SELECT i FROM Invitation i INNER JOIN i.paper p WHERE p.paperId = :paperId AND i.status = :#{#status}")
    List<Invitation> findByPaperIdAndStatus(Integer paperId, InvitationStatus status);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE Invitation SET status = :#{#status.name()} WHERE paperId = :paperId AND status = 'PENDING'", nativeQuery = true)
    void updateInvitationStatusByPaperId(Integer paperId, InvitationStatus status);
  
    @Query("SELECT i FROM Invitation i JOIN i.reviewer re JOIN i.paper p "
            + "WHERE (:#{#req.title} IS NULL OR p.title LIKE %:#{#req.title}%)"
            + "AND (:#{#req.reviewerId} is null OR re.reviewerId LIKE :#{#req.reviewerId})"
            + "AND (:#{#req.status} is null OR i.status = :#{#req.status})"
            )
    Page<Invitation> searchFilter(@Param(value ="req") InvitationSearchFilterRequest req, Pageable page);
}
