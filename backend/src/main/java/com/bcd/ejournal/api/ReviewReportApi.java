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
    public ResponseEntity<Void> updateReviewReport(@AuthenticationPrincipal AccountJWTPayload payload,
            @PathVariable(name = "id") Integer reviewReportId, @RequestBody ReviewReportSubmitRequest req) {
        reportService.updateReviewReport(payload.getAccountId(), reviewReportId, req);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/search")
    public ResponseEntity<PagingResponse> searchOfReviewer(@AuthenticationPrincipal AccountJWTPayload payload,
            @RequestBody ReviewReportSearchFilterRequest req) {
        req.setReviewerId(payload.getAccountId());
        PagingResponse response = reportService.search(req);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    
    }
