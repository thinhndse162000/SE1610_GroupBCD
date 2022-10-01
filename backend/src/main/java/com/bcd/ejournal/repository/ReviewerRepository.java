package com.bcd.ejournal.repository;

import com.bcd.ejournal.domain.entity.Reviewer;
import org.springframework.data.repository.CrudRepository;

public interface ReviewerRepository extends CrudRepository<Reviewer, Integer> {
}
