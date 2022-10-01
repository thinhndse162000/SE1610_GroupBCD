package com.bcd.ejournal.api;

import com.bcd.ejournal.domain.dto.request.ReviewReportSearchRequest;
import com.bcd.ejournal.domain.dto.request.ReviewReportSubmitRequest;
import com.bcd.ejournal.domain.dto.request.ReviewReportUpdateRequest;
import com.bcd.ejournal.domain.entity.ReviewReport;
import com.bcd.ejournal.service.ReviewReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(path = "/reviewrport")
public class ReviewReportApi {
    @Autowired
    private ReviewReportService reportService;


    @PutMapping(value = "/update")
    public ResponseEntity<?> updateReviewReport(@RequestBody ReviewReportUpdateRequest req) {
        reportService.updateReviewReport(req);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/search")
    public ResponseEntity<?> search(@RequestBody ReviewReportSearchRequest req) {
        List<ReviewReport> rs = reportService.searchByRequest(req);
        return ResponseEntity.ok(rs);
    }

    @PostMapping("/download")
    public ResponseEntity<?> getFile(@RequestBody String fileName) throws IOException {
        Resource rs = reportService.downloadFile(fileName);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + rs.getFilename() + "\"").body(rs);
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitReport(@RequestBody ReviewReportSubmitRequest req) {
        reportService.submitReviewReport(req);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
