package com.bcd.ejournal.service.implementation;

import com.bcd.ejournal.domain.dto.request.ReviewReportSearchRequest;
import com.bcd.ejournal.domain.dto.request.ReviewReportSubmitRequest;
import com.bcd.ejournal.domain.dto.request.ReviewReportUpdateRequest;
import com.bcd.ejournal.domain.entity.ReviewReport;
import com.bcd.ejournal.repository.RequestMapper;
import com.bcd.ejournal.repository.ReviewReportRepository;
import com.bcd.ejournal.service.ReviewReportService;
import com.bcd.ejournal.utils.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewReportServiceImpl implements ReviewReportService {

    @Value("${paper.file.dir}")
    private String uploadDir;

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

    @Override
    public Resource downloadFile(String fileName) throws IOException {
        return FileUtils.load(uploadDir, fileName);
    }

    @Override
    public void submitReviewReport(ReviewReportSubmitRequest req) {
        // TODO Auto-generated method stub
        ReviewReport report = new ReviewReport(req);
        try {
            report.setGrade(req.getGrade());
            report.setText(req.getText());
            report.setCondentiality(req.getCondentiality());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
