package com.bcd.ejournal.service.implementation;

import com.bcd.ejournal.domain.dto.request.ReviewReportSearchRequest;
import com.bcd.ejournal.domain.dto.request.ReviewReportSubmitRequest;
import com.bcd.ejournal.domain.entity.ReviewReport;
import com.bcd.ejournal.repository.RequestMapper;
import com.bcd.ejournal.repository.ReviewReportRepository;
import com.bcd.ejournal.service.ReviewReportService;
import com.bcd.ejournal.utils.FileUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewReportServiceImpl implements ReviewReportService {

    @Value("${paper.file.dir}")
    private String uploadDir;

    private final ReviewReportRepository reviewreportRepository;

    private final RequestMapper reviewMapper;
    private final ModelMapper modelMapper;

    @Autowired
    public ReviewReportServiceImpl(ReviewReportRepository reviewreportRepository, RequestMapper reviewMapper, ModelMapper modelMapper) {
        this.reviewreportRepository = reviewreportRepository;
        this.reviewMapper = reviewMapper;
        this.modelMapper = modelMapper;
    }

    @Override
    public void updateReviewReport(Integer reviewReportId, ReviewReportSubmitRequest req) {
        // TODO: verify reviewer
        // TODO: verify paper is in reviewing process
        ReviewReport reviewReport = reviewreportRepository.findById(reviewReportId)
                .orElseThrow(() -> new NullPointerException("Review report not found. ID: " + reviewReportId));

        modelMapper.map(reviewReport, req);
        reviewreportRepository.save(reviewReport);
    }

    @Override
    public List<ReviewReport> searchByRequest(ReviewReportSearchRequest reportSearchRequest) {
        // TODO: fix bug, its not mapping Object
        // TODO: authorization
        List<ReviewReport> rs = reviewMapper.searchReview(reportSearchRequest);
        return rs;
    }

    @Override
    public Resource downloadFile(String fileName) throws IOException {
        // TODO: verify reviewer can download
        // TODO: verify author
        return FileUtils.load(uploadDir, fileName);
    }

    @Override
    // TODO: remove this, already created in invitation
    public void submitReviewReport(ReviewReportSubmitRequest req) {
        ReviewReport report = new ReviewReport(req);
//        try {
//            report.setGrade(req.getGrade());
//            report.setText(req.getText());
//            report.setCondentiality(req.getConfidentiality());
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
    }
}
