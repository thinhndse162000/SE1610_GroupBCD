package com.bcd.ejournal.repository;

import com.bcd.ejournal.domain.entity.Paper;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaperRepository extends CrudRepository<Paper, Integer> {
    @Query("SELECT p FROM Paper p WHERE p.title LIKE %:title%")
    Iterable<Paper> searchByTitle(String title);
}
