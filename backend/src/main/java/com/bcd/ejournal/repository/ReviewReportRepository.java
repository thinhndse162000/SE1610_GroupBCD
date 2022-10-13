package com.bcd.ejournal.repository;

import com.bcd.ejournal.domain.entity.ReviewReport;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewReportRepository extends CrudRepository<ReviewReport, Integer> {
}
