package com.bcd.ejournal.service;

import java.util.List;

import com.bcd.ejournal.domain.dto.request.ReviewReportSearchFilterRequest;
import com.bcd.ejournal.domain.dto.request.ReviewReportSubmitRequest;
import com.bcd.ejournal.domain.dto.response.PagingResponse;
import com.bcd.ejournal.domain.dto.response.ReviewReportDetailResponse;

public interface ReviewReportService {
    void updateReviewReport(Integer accountId, Integer reviewReportId, ReviewReportSubmitRequest req);

    List<ReviewReportDetailResponse> getAllReviewReport(Integer reviewerId);

    ReviewReportDetailResponse getReviewReport(Integer reviewerId, Integer reviewReportId);
    
    PagingResponse search(ReviewReportSearchFilterRequest req);
}
