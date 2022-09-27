package com.bcd.ejournal.service;

import java.util.List;

import com.bcd.ejournal.domain.dto.request.ReviewReportSearchRequest;
import com.bcd.ejournal.domain.dto.request.ReviewReportUpdateRequest;
import com.bcd.ejournal.domain.entity.ReviewReport;

public interface ReviewReportService {
	void updateReviewReport(ReviewReportUpdateRequest req);
	
	List<ReviewReport> searchByRequest(ReviewReportSearchRequest reportSearchRequest);

}
