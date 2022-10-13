package com.bcd.ejournal.service;

import com.bcd.ejournal.domain.dto.request.ReviewReportSearchRequest;
import com.bcd.ejournal.domain.dto.request.ReviewReportSubmitRequest;
import com.bcd.ejournal.domain.dto.response.ReviewReportDetailResponse;
import com.bcd.ejournal.domain.entity.ReviewReport;

import java.util.List;

public interface ReviewReportService {
    void updateReviewReport(Integer reviewReportId, ReviewReportSubmitRequest req);

    List<ReviewReport> searchByRequest(ReviewReportSearchRequest reportSearchRequest);

    List<ReviewReportDetailResponse> getAllReviewReport(Integer reviewerId);

    void submitReviewReport(ReviewReportSubmitRequest req);
}
