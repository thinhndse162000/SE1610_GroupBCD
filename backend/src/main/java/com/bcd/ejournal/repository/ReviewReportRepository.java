package com.bcd.ejournal.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bcd.ejournal.domain.dto.request.ReviewReportSearchFilterRequest;
import com.bcd.ejournal.domain.entity.ReviewReport;
import com.bcd.ejournal.domain.enums.ReviewReportStatus;

@Repository
public interface ReviewReportRepository extends CrudRepository<ReviewReport, Integer> {
    @Query(value = "SELECT r FROM ReviewReport r INNER JOIN r.paper p WHERE p.paperId = :paperId AND r.status = :#{#status}")
    List<ReviewReport> findByPaperIdAndStatus(Integer paperId, ReviewReportStatus status);

    @Query("SELECT rp FROM ReviewReport rp "
            + "JOIN rp.reviewer re JOIN rp.paper p "
            + "WHERE (:#{#req.status} is null OR rp.status = :#{#req.status})"
            + "AND (:#{#req.title} is null OR p.title LIKE %:#{#req.title}%)"
            + "AND (:#{#req.verdict} is null OR rp.verdict = :#{#req.verdict})"
            + "AND (:#{#req.reviewerId} is null OR re.reviewerId = :#{#req.reviewerId})")
    Page<ReviewReport> search(@Param(value = "req") ReviewReportSearchFilterRequest req, Pageable page);
}
