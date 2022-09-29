package com.bcd.ejournal.service;

import java.io.IOException;
import java.util.List;

import org.springframework.core.io.Resource;

import com.bcd.ejournal.domain.dto.request.ReviewReportSearchRequest;
import com.bcd.ejournal.domain.dto.request.ReviewReportSubmitRequest;
import com.bcd.ejournal.domain.dto.request.ReviewReportUpdateRequest;
import com.bcd.ejournal.domain.entity.ReviewReport;

public interface ReviewReportService {
	void updateReviewReport(ReviewReportUpdateRequest req);
	
	List<ReviewReport> searchByRequest(ReviewReportSearchRequest reportSearchRequest);
	
	Resource downloadFile(String fileName) throws IOException ;
	
	void submitReviewReport(ReviewReportSubmitRequest req);
}
