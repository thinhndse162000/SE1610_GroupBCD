package com.bcd.ejournal.api;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bcd.ejournal.domain.dto.request.ReviewReportSearchRequest;
import com.bcd.ejournal.domain.dto.request.ReviewReportUpdateRequest;
import com.bcd.ejournal.domain.entity.ReviewReport;
import com.bcd.ejournal.service.ReviewReportService;

@RestController
@RequestMapping(path = "/reviewrport")
public class ReviewReportApi {

	private ReviewReportService reportService;
	
	@PutMapping(value = "/update")
	public ResponseEntity<?> updateReviewReport(@RequestBody ReviewReportUpdateRequest req){
		reportService.updateReviewReport(req);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/search")
	public ResponseEntity<?> search(@RequestBody ReviewReportSearchRequest req){
		List<ReviewReport> rs = reportService.searchByRequest(req);
		return ResponseEntity.ok(rs);		
	}
}
