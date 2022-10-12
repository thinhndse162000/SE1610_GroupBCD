package com.bcd.ejournal.repository;

import com.bcd.ejournal.domain.entity.ReviewReport;
import com.bcd.ejournal.domain.enums.ReviewReportStatus;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewReportRepository extends CrudRepository<ReviewReport, Integer> {
    @Query(value = "SELECT * FROM ReviewReport r WHERE r.paperId = :paperId AND r.status = :#{#status.name()}", nativeQuery = true)
    List<ReviewReport> findByPaperIdAndStatus(Integer paperId, ReviewReportStatus status);
}
