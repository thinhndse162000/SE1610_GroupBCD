package com.bcd.ejournal.repository;

import com.bcd.ejournal.domain.entity.Journal;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface JournalRepository extends CrudRepository<Journal, Integer> {
    Iterable<Journal> findByNameContains(String name);

    Optional<Journal> findBySlug(String slug);
}
