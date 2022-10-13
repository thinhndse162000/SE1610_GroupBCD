package com.bcd.ejournal.utils;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bcd.ejournal.domain.dto.response.AccountProfileResponse;
import com.bcd.ejournal.domain.dto.response.AuthorResponse;
import com.bcd.ejournal.domain.dto.response.IssueResponse;
import com.bcd.ejournal.domain.dto.response.JournalResponse;
import com.bcd.ejournal.domain.dto.response.PaperResponse;
import com.bcd.ejournal.domain.dto.response.PublishResponse;
import com.bcd.ejournal.domain.dto.response.ReviewReportDetailResponse;
import com.bcd.ejournal.domain.dto.response.ReviewReportResponse;
import com.bcd.ejournal.domain.dto.response.ReviewerResponse;
import com.bcd.ejournal.domain.entity.Account;
import com.bcd.ejournal.domain.entity.Author;
import com.bcd.ejournal.domain.entity.Issue;
import com.bcd.ejournal.domain.entity.Paper;
import com.bcd.ejournal.domain.entity.Publish;
import com.bcd.ejournal.domain.entity.ReviewReport;
import com.bcd.ejournal.domain.entity.Reviewer;

@Component
public class DTOMapper {
    private final ModelMapper modelMapper;

    @Autowired
    public DTOMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public AccountProfileResponse toAccountProfileResponse(Account account) {
        return modelMapper.map(account, AccountProfileResponse.class);
    }

    public PaperResponse toPaperResponse(Paper paper) {
        PaperResponse paperResponse = modelMapper.map(paper, PaperResponse.class);
        paperResponse.setJournal(modelMapper.map(paper.getJournal(), JournalResponse.class));
        paperResponse.setAuthors(toAuthorResponse(paper.getAuthor()));
        return paperResponse;
    }

    public AuthorResponse toAuthorResponse(Author author) {
        AuthorResponse authorResponse = modelMapper.map(author, AuthorResponse.class);
        authorResponse.setFullName(author.getAccount().getFullName());
        authorResponse.setSlug(author.getAccount().getSlug());
        return authorResponse;
    }

    public IssueResponse toIssueResponse(Issue issue) {
        IssueResponse issueResponse = modelMapper.map(issue, IssueResponse.class);
        issueResponse.setJournal(modelMapper.map(issue.getJournal(), JournalResponse.class));
        issueResponse.setNumberOfPaper(issue.getPublishes().size());
        return issueResponse;
    }

    public PublishResponse toPublishResponse(Publish publish) {
        PublishResponse response = modelMapper.map(publish, PublishResponse.class);
        response.setPaper(toPaperResponse(publish.getPaper()));
        response.setIssue(toIssueResponse(publish.getIssue()));
        return response;
    }

    public ReviewReportResponse toReviewReportResponse(ReviewReport reviewReport) {
        ReviewReportResponse response = modelMapper.map(reviewReport, ReviewReportResponse.class);
        Account acc = reviewReport.getReviewer().getAccount();
        response.setReviewer(new ReviewerResponse(acc.getAccountId(), acc.getFullName()));
        return response;
    }

    public ReviewReportDetailResponse toReviewReportDetailResponse(ReviewReport reviewReport) {
        ReviewReportDetailResponse response = new ReviewReportDetailResponse();
        response.setPaper(toPaperResponse(reviewReport.getPaper()));

        ReviewReportResponse tmp = modelMapper.map(reviewReport, ReviewReportResponse.class);
        Account acc = reviewReport.getReviewer().getAccount();
        tmp.setReviewer(new ReviewerResponse(acc.getAccountId(), acc.getFullName()));
        response.setReview(tmp);

        return response;
    }

    public ReviewerResponse toReviewerResponse(Reviewer reviewer) {
        ReviewerResponse response = new ReviewerResponse();
        response.setReviewerId(reviewer.getReviewerId());
        response.setFullName(reviewer.getAccount().getFullName());
        return response;
    }
}
