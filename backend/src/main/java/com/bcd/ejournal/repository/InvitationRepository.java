package com.bcd.ejournal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.bcd.ejournal.domain.entity.Invitation;
import com.bcd.ejournal.domain.enums.InvitationStatus;
<<<<<<< HEAD
=======
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;
>>>>>>> fa7bc9628dcf3d0fa2ef64cf90a8ecb9602c3fb0

public interface InvitationRepository extends CrudRepository<Invitation, Integer> {
    @Query(value = "SELECT * FROM Invitation i WHERE i.InvitationId = :Id AND i.ReviewerId = :reviewerId", nativeQuery = true)
    Optional<Invitation> findByIdAndReviewerId(Integer Id, Integer reviewerId);

<<<<<<< HEAD
    @Query(value = "SELECT i FROM Invitation i WHERE i.paperID = :paperId and status LIKE :status.name", nativeQuery = true)
    List<Invitation> findByPaperIdAndStatus(@Param("paperId") Integer paperId, @Param("status") InvitationStatus status);
=======
    @Query(value = "SELECT * FROM Invitation i WHERE i.paperId = :paperId AND i.status = :#{#status.name()}", nativeQuery = true)
    List<Invitation> findByPaperIdAndStatus(Integer paperId, InvitationStatus status);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE Invitation SET status = :#{#status.name()} WHERE paperId = :paperId AND status = 'PENDING'", nativeQuery = true)
    void updateInvitationStatusByPaperId(Integer paperId, InvitationStatus status);
>>>>>>> fa7bc9628dcf3d0fa2ef64cf90a8ecb9602c3fb0
}
