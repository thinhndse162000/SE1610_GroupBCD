package com.bcd.ejournal.repository;

import org.springframework.data.repository.CrudRepository;

import com.bcd.ejournal.domain.entity.Reviewer;

public interface ReviewerRepository extends CrudRepository<Reviewer, Integer> {
	
	
}
