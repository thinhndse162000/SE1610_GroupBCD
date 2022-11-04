package com.bcd.ejournal.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.bcd.ejournal.domain.entity.Reviewer;

public interface ReviewerRepository extends CrudRepository<Reviewer, Integer> {
    @Query(value = "SELECT DISTINCT(r) FROM Reviewer r INNER JOIN r.fields f "
            + "WHERE r.reviewerId NOT IN (SELECT r.reviewerId FROM Invitation i INNER JOIN i.reviewer r INNER JOIN i.paper p WHERE p.paperId = :paperId)"
            + "AND f.fieldId in (SELECT field.fieldId FROM Paper p INNER JOIN p.fields field WHERE p.paperId = :paperId) "
            + "AND r.invitable = 1")
    Page<Reviewer> findAvailableReviewer(Integer paperId, Pageable page);

    @Query(value = "SELECT DISTINCT(r) FROM Reviewer r INNER JOIN r.fields f "
            + "WHERE r.reviewerId NOT IN (SELECT r.reviewerId FROM Invitation i INNER JOIN i.reviewer r INNER JOIN i.paper p WHERE p.paperId = :paperId)"
            + "AND f.fieldId in (SELECT field.fieldId FROM Paper p INNER JOIN p.fields field WHERE p.paperId = :paperId) "
            + "AND r.invitable = 1")
    List<Reviewer> findAvailableReviewer(Integer paperId);

    @Query(value = "SELECT r FROM Reviewer r, Paper p "
            + "WHERE p.paperId = :paperId "
            + "AND r.reviewerId NOT IN (SELECT r.reviewerId FROM Invitation i INNER JOIN i.reviewer r INNER JOIN i.paper p WHERE p.paperId = :paperId)"
            + "AND (SELECT COUNT(*) FROM p.fields) = (SELECT COUNT(*) FROM r.fields f WHERE f.fieldId IN (SELECT field.fieldId FROM Paper p INNER JOIN p.fields field WHERE p.paperId = :paperId)) "
            + "AND r.reviewerId <> (SELECT au.authorId FROM p.author au)"
            + "AND r.invitable = 1")
    List<Reviewer> findAvailableReviewerIncludeAllPaperField(Integer paperId);

    @Query(value = "SELECT r FROM Reviewer r, Paper p "
            + "WHERE p.paperId = :paperId "
            + "AND r.reviewerId NOT IN (SELECT r.reviewerId FROM Invitation i INNER JOIN i.reviewer r INNER JOIN i.paper p WHERE p.paperId = :paperId)"
            + "AND (SELECT COUNT(*) FROM p.fields) = (SELECT COUNT(*) FROM r.fields f WHERE f.fieldId IN (SELECT field.fieldId FROM Paper p INNER JOIN p.fields field WHERE p.paperId = :paperId)) "
            + "AND r.reviewerId <> (SELECT au.authorId FROM p.author au)"
            + "AND r.invitable = 1")
    Page<Reviewer> findAvailableReviewerIncludeAllPaperField(Integer paperId, Pageable page);
}
