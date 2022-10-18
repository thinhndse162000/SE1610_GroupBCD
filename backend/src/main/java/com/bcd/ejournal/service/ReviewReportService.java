package com.bcd.ejournal.service;

import java.util.List;

import com.bcd.ejournal.domain.dto.request.ReviewReportSearchFilterRequest;
import com.bcd.ejournal.domain.dto.request.ReviewReportSearchRequest;
import com.bcd.ejournal.domain.dto.request.ReviewReportSubmitRequest;
import com.bcd.ejournal.domain.dto.response.ReviewReportDetailResponse;
import com.bcd.ejournal.domain.dto.response.ReviewReportResponse;
import com.bcd.ejournal.domain.entity.ReviewReport;

public interface ReviewReportService {
    void updateReviewReport(Integer accountId, Integer reviewReportId, ReviewReportSubmitRequest req);

    List<ReviewReport> searchByRequest(ReviewReportSearchRequest reportSearchRequest);

    List<ReviewReportDetailResponse> getAllReviewReport(Integer reviewerId);

    ReviewReportDetailResponse getReviewReport(Integer reviewerId, Integer reviewReportId);
    
    List<ReviewReportResponse> searchFilter(ReviewReportSearchFilterRequest req );
}
