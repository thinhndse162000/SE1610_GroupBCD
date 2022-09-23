package com.bcd.ejournal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bcd.ejournal.domain.entity.Paper;

@Repository
public interface PaperRepository extends CrudRepository<Paper, Integer>{
//	Paper findPaperById(int id);
	Paper findPaperByTitle(String title);
	@Query("SELECT p FROM Paper p WHERE p.title LIKE :title")
	List<Paper> search(@Param("title") String title);
}
