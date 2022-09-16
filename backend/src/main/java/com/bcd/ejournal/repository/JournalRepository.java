package com.bcd.ejournal.repository;

import com.bcd.ejournal.domain.entity.Journal;
import org.springframework.data.repository.CrudRepository;

public interface JournalRepository extends CrudRepository<Journal, Integer> {
}
