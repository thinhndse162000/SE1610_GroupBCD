package com.bcd.ejournal.service.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bcd.ejournal.domain.dto.request.ReviewReportSearchRequest;
import com.bcd.ejournal.domain.dto.request.ReviewReportUpdateRequest;
import com.bcd.ejournal.domain.entity.ReviewReport;
import com.bcd.ejournal.repository.RequestMapper;
import com.bcd.ejournal.repository.ReviewReportRepository;
import com.bcd.ejournal.service.ReviewReportService;

@Service
public class ReviewReportServiceImp implements ReviewReportService{
	@Autowired
	private ReviewReportRepository reviewreportRepository;

	@Autowired(required = true)
	private RequestMapper reviewMapper;
	
	@Override
	public void updateReviewReport(ReviewReportUpdateRequest req) {
		// TODO Auto-generated method stub
		Optional<ReviewReport> reviewReport = reviewreportRepository.findById(req.getReviewReportId());
		ReviewReport newReviewReport = new ReviewReport();
		newReviewReport = reviewReport.get();
		newReviewReport.setGrade(req.getGrade());
		newReviewReport.setText(req.getText());
		newReviewReport.setCondentiality(req.getCondentiality());
		reviewreportRepository.save(newReviewReport);
	}

	@Override
	public List<ReviewReport> searchByRequest(ReviewReportSearchRequest reportSearchRequest) {
		// TODO Auto-generated method stub
		List<ReviewReport> rs = reviewMapper.searchReview(reportSearchRequest);
		return rs;
	}
	
}
