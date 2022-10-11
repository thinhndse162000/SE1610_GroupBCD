package com.bcd.ejournal.repository;




import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bcd.ejournal.domain.dto.request.PaperSearchRequest;
import com.bcd.ejournal.domain.entity.Paper;

@Repository
public interface PaperRepository extends CrudRepository<Paper, Integer> {
	/*
	 * @Query("SELECT p FROM Paper p WHERE p.title LIKE %:title%") Iterable<Paper>
	 * searchByTitle(String title , Pageable pageable);
	 */
    
    @Query("SELECT p FROM Paper p "
            + "JOIN p.journal ti "
            + "JOIN p.author au " 
            + "WHERE p.paperId = :#{#req.paperId}  "
            + "AND (:#{#req.authorId} is null OR au.authorID = :#{#req.authorId})"
            + "AND (:#{#req.journalId} is null OR ti.journalID = :#{#req.journalId})"
            )
    List<Paper> searchByRequest(@Param(value = "req") PaperSearchRequest req, Pageable pageable);
}
