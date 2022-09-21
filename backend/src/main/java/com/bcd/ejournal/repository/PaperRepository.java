package com.bcd.ejournal.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bcd.ejournal.domain.entity.Paper;

@Repository
public interface PaperRepository extends CrudRepository<Paper, Integer>{
	Optional<Paper> findById(int Id);
}
