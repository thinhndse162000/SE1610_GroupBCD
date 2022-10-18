package com.bcd.ejournal.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bcd.ejournal.configuration.jwt.payload.AccountJWTPayload;
import com.bcd.ejournal.domain.dto.request.ReviewReportSearchFilterRequest;
import com.bcd.ejournal.domain.dto.request.ReviewReportSearchRequest;
import com.bcd.ejournal.domain.dto.request.ReviewReportSubmitRequest;
import com.bcd.ejournal.domain.dto.response.PagingResponse;
import com.bcd.ejournal.domain.dto.response.ReviewReportResponse;
import com.bcd.ejournal.service.ReviewReportService;

@RestController
@RequestMapping(path = "/reviewreport")
public class ReviewReportApi {
    @Autowired
    private ReviewReportService reportService;

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateReviewReport(@AuthenticationPrincipal AccountJWTPayload payload, @PathVariable(name = "id") Integer reviewReportId, @RequestBody ReviewReportSubmitRequest req) {
        reportService.updateReviewReport(payload.getAccountId(), reviewReportId, req);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/search")
    public ResponseEntity<PagingResponse> searchOfReviewer(@RequestBody ReviewReportSearchRequest req) {
        // TODO: verify account
        PagingResponse rs = reportService.searchByRequest(req);
        return ResponseEntity.ok(rs);
    }
    
    @PostMapping("/searchFilter")
    public ResponseEntity<List<ReviewReportResponse>> searchFilter(@RequestBody ReviewReportSearchFilterRequest req ){
    	List<ReviewReportResponse> responses = reportService.searchFilter(req);
    	return new ResponseEntity<>(responses, HttpStatus.OK);
    }
    
}
