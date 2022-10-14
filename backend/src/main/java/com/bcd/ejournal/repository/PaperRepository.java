package com.bcd.ejournal.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bcd.ejournal.domain.dto.request.PaperSearchRequest;
import com.bcd.ejournal.domain.entity.Paper;

@Repository
public interface PaperRepository extends CrudRepository<Paper, Integer> {
<<<<<<< HEAD
	/*
	 * @Query("SELECT p FROM Paper p WHERE p.title LIKE %:title%") Iterable<Paper>
	 * searchByTitle(String title , Pageable pageable);
	 */
    
    @Query("SELECT p FROM Paper p "
            + "JOIN p.journal ti "
            + "JOIN p.author au " 
            + "WHERE (:#{#req.title} is null OR p.title like %:#{#req.title}%) "
            + "AND (:#{#req.authorId} is null OR au.authorId = :#{#req.authorId})"
            + "AND (:#{#req.journalId} is null OR ti.journalId = :#{#req.journalId})"
            + "AND (:#{#req.submitTime} is null OR p.submitTime > :#{#req.submitTime})"
            + "AND (:#{#req.status} is null OR p.status = :#{#req.status})"
            )
    List<Paper> searchByRequest(@Param(value = "req") PaperSearchRequest req, Pageable pageable);
=======
    @Query("SELECT p FROM Paper p WHERE p.title LIKE %:title%")
    Iterable<Paper> searchByTitle(String title);

    @Query("SELECT p FROM Paper p JOIN p.journal j JOIN p.author a "
            + "WHERE (:#{#req.title} IS NULL OR lower(p.title) LIKE lower(CONCAT('%', :#{#req.title}, '%')))"
            + "AND (:#{#req.journalId} IS NULL OR j.journalId = :#{#req.journalId})"
            + "AND (:#{#req.authorId} IS NULL OR a.authorId = :#{#req.authorId})"
            + "AND (:#{#req.startDate} IS NULL OR p.submitTime > :#{#req.startDate})"
            + "AND (:#{#req.status} IS NULL OR p.status = :#{#req.status})")
    Page<Paper> searchAndFilter(PaperSearchRequest req, Pageable page);
>>>>>>> 3fadac01e5e1ab735657b1f75a080e621491e8fe
}
