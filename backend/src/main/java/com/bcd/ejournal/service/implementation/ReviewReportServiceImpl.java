package com.bcd.ejournal.service.implementation;

import com.bcd.ejournal.domain.dto.request.ReviewReportSearchRequest;
import com.bcd.ejournal.domain.dto.request.ReviewReportSubmitRequest;
import com.bcd.ejournal.domain.dto.response.*;
import com.bcd.ejournal.domain.entity.*;
import com.bcd.ejournal.domain.enums.ReviewReportStatus;
import com.bcd.ejournal.repository.PaperRepository;
import com.bcd.ejournal.repository.RequestMapper;
import com.bcd.ejournal.repository.ReviewReportRepository;
import com.bcd.ejournal.repository.ReviewerRepository;
import com.bcd.ejournal.service.ReviewReportService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewReportServiceImpl implements ReviewReportService {

    private final ReviewReportRepository reviewreportRepository;
    private final ReviewerRepository reviewerRepository;
    private final PaperRepository paperRepository;
    private final RequestMapper reviewMapper;
    private final ModelMapper modelMapper;
    @Value("${paper.file.dir}")
    private String uploadDir;

    @Autowired
    public ReviewReportServiceImpl(ReviewReportRepository reviewreportRepository, ReviewerRepository reviewerRepository, PaperRepository paperRepository, RequestMapper reviewMapper, ModelMapper modelMapper) {
        this.reviewreportRepository = reviewreportRepository;
        this.reviewerRepository = reviewerRepository;
        this.paperRepository = paperRepository;
        this.reviewMapper = reviewMapper;
        this.modelMapper = modelMapper;
    }

    @Override
    public void updateReviewReport(Integer reviewReportId, ReviewReportSubmitRequest req) {
        // TODO: verify reviewer
        // TODO: verify paper is in reviewing process
        ReviewReport reviewReport = reviewreportRepository.findById(reviewReportId)
                .orElseThrow(() -> new NullPointerException("Review report not found. Id: " + reviewReportId));

        modelMapper.map(req, reviewReport);
        reviewReport.setReviewDate(new Timestamp(System.currentTimeMillis()));
        reviewReport.setStatus(ReviewReportStatus.DONE);
        reviewreportRepository.save(reviewReport);
        // TODO: begin evaluation process
    }

    @Override
    public List<ReviewReport> searchByRequest(ReviewReportSearchRequest reportSearchRequest) {
        // TODO: fix bug, its not mapping Object
        // TODO: authorization
        List<ReviewReport> rs = reviewMapper.searchReview(reportSearchRequest);
        return rs;
    }

    @Override
    public List<ReviewReportDetailResponse> getAllReviewReport(Integer reviewerId) {
        Reviewer reviewer = reviewerRepository.findById(reviewerId)
                .orElseThrow(() -> new NullPointerException("No reviewer found. Id: " + reviewerId));
        return reviewer.getReviewReports().stream()
                .map(this::fromReviewReport)
                .collect(Collectors.toList());
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

    private ReviewReportDetailResponse fromReviewReport(ReviewReport reviewReport) {
        ReviewReportDetailResponse response = new ReviewReportDetailResponse();
        response.setPaper(fromPaper(reviewReport.getPaper()));

        ReviewReportResponse tmp = modelMapper.map(reviewReport, ReviewReportResponse.class);
        Account acc = reviewReport.getReviewer().getAccount();
        tmp.setReviewer(new ReviewerResponse(acc.getAccountId(), acc.getFullName()));
        response.setReview(tmp);

        return response;
    }

    private PaperResponse fromPaper(Paper paper) {
        PaperResponse paperResponse = modelMapper.map(paper, PaperResponse.class);
        paperResponse.setJournal(modelMapper.map(paper.getJournal(), JournalResponse.class));
        paperResponse.setAuthors(fromAuthor(paper.getAuthor()));
        return paperResponse;
    }

    private AuthorResponse fromAuthor(Author author) {
        AuthorResponse authorResponse = modelMapper.map(author, AuthorResponse.class);
        authorResponse.setFullName(author.getAccount().getFullName());
        return authorResponse;
    }
}
