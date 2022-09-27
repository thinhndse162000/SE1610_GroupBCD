package com.bcd.ejournal.repository;

import com.bcd.ejournal.domain.entity.Paper;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaperRepository extends CrudRepository<Paper, Integer> {
}
