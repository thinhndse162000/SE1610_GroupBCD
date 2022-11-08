package com.bcd.ejournal.utils;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bcd.ejournal.domain.dto.response.AccountProfileResponse;
import com.bcd.ejournal.domain.dto.response.AuthorResponse;
import com.bcd.ejournal.domain.dto.response.EducationResponse;
import com.bcd.ejournal.domain.dto.response.InvitationPaperResponse;
import com.bcd.ejournal.domain.dto.response.InvitationReviewerResponse;
import com.bcd.ejournal.domain.dto.response.InvoiceResponse;
import com.bcd.ejournal.domain.dto.response.IssueResponse;
import com.bcd.ejournal.domain.dto.response.JournalResponse;
import com.bcd.ejournal.domain.dto.response.PaperResponse;
import com.bcd.ejournal.domain.dto.response.PublishResponse;
import com.bcd.ejournal.domain.dto.response.ReviewReportDetailResponse;
import com.bcd.ejournal.domain.dto.response.ReviewReportResponse;
import com.bcd.ejournal.domain.dto.response.ReviewerResponse;
import com.bcd.ejournal.domain.entity.Account;
import com.bcd.ejournal.domain.entity.Author;
import com.bcd.ejournal.domain.entity.Invitation;
import com.bcd.ejournal.domain.entity.Invoice;
import com.bcd.ejournal.domain.entity.Issue;
import com.bcd.ejournal.domain.entity.Journal;
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

        AccountProfileResponse response = modelMapper.map(account, AccountProfileResponse.class);
        response.setPhone(response.getPhone().trim());
        return response;
    }

    public PaperResponse toPaperResponse(Paper paper) {
        PaperResponse paperResponse = modelMapper.map(paper, PaperResponse.class);
        paperResponse.setJournal(toJournalResponse(paper.getJournal()));
        paperResponse.setAuthors(toAuthorResponse(paper.getAuthor()));
        paperResponse.setLinkPDF(paper.getLinkPDF().trim());
        return paperResponse;
    }

    public JournalResponse toJournalResponse(Journal journal) {
        JournalResponse response = modelMapper.map(journal, JournalResponse.class);
        response.setManagerEmail(journal.getManager().getEmail());
        return response;
    }

    public EducationResponse toEducationResponse(Account account) {
        EducationResponse educationResponse = new EducationResponse();
        modelMapper.map(account.getReviewer(), educationResponse);
        modelMapper.map(account.getAuthor(), educationResponse);

        return educationResponse;
    }

    public AuthorResponse toAuthorResponse(Author author) {
        AuthorResponse authorResponse = modelMapper.map(author, AuthorResponse.class);
        authorResponse.setFullName(author.getAccount().getFullName());
        authorResponse.setSlug(author.getAccount().getSlug());
        return authorResponse;
    }

    public IssueResponse toIssueResponse(Issue issue) {
        IssueResponse issueResponse = modelMapper.map(issue, IssueResponse.class);
        issueResponse.setJournal(toJournalResponse(issue.getJournal()));
        issueResponse.setNumberOfPaper(issue.getPublishes().size());
        issueResponse.setLinkPDF(issue.getLinkPDF().trim());
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
        response.setReviewer(toReviewerResponse(acc.getReviewer()));
        return response;
    }

    public ReviewReportDetailResponse toReviewReportDetailResponse(ReviewReport reviewReport) {
        ReviewReportDetailResponse response = new ReviewReportDetailResponse();
        response.setPaper(toPaperResponse(reviewReport.getPaper()));

        ReviewReportResponse tmp = modelMapper.map(reviewReport, ReviewReportResponse.class);
        Account acc = reviewReport.getReviewer().getAccount();
        tmp.setReviewer(toReviewerResponse(acc.getReviewer()));
        response.setReview(tmp);

        return response;
    }

    public ReviewerResponse toReviewerResponse(Reviewer reviewer) {
        ReviewerResponse response = new ReviewerResponse();
        response.setReviewerId(reviewer.getReviewerId());
        response.setFullName(reviewer.getAccount().getFullName());
        response.setFields(reviewer.getFields());
        response.setInvitable(reviewer.isInvitable());
        return response;
    }

    public InvitationPaperResponse toInvitationPaperResponse(Invitation invitation) {
        InvitationPaperResponse response = modelMapper.map(invitation, InvitationPaperResponse.class);
        Reviewer reviewer = invitation.getReviewer();
        response.setReviewer(toReviewerResponse(reviewer));
        return response;
    }

    public InvitationReviewerResponse toInvitationReviewerResponse(Invitation invitation) {
        InvitationReviewerResponse response = modelMapper.map(invitation, InvitationReviewerResponse.class);
        PaperResponse paperResponse = toPaperResponse(invitation.getPaper());
        response.setPaper(paperResponse);
        return response;
    }
    
    public InvoiceResponse toInvoiceResponse(Invoice invoice) {
    	InvoiceResponse invoiceResponse = modelMapper.map(invoice, InvoiceResponse.class);
    	return invoiceResponse;
    }
}
