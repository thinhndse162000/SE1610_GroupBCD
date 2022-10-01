package com.bcd.ejournal.service;

import com.bcd.ejournal.domain.dto.request.ReviewReportSearchRequest;
import com.bcd.ejournal.domain.dto.request.ReviewReportSubmitRequest;
import com.bcd.ejournal.domain.entity.ReviewReport;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.List;

public interface ReviewReportService {
    void updateReviewReport(Integer reviewReportId, ReviewReportSubmitRequest req);

    List<ReviewReport> searchByRequest(ReviewReportSearchRequest reportSearchRequest);

    Resource downloadFile(String fileName) throws IOException;

    void submitReviewReport(ReviewReportSubmitRequest req);
}
