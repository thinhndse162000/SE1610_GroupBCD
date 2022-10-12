package com.bcd.ejournal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.bcd.ejournal.domain.entity.Publish;

public interface PublishRepository extends CrudRepository<Publish, Integer> {
    @Query(value = "SELECT * FROM Publish WHERE paperId IN (SELECT paperId FROM Paper WHERE journalId = 4)", nativeQuery = true)
    List<Publish> findByJournalId(Integer journalId);
}
