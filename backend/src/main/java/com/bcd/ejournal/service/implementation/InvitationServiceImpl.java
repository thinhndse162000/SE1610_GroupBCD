package com.bcd.ejournal.service.implementation;

import com.bcd.ejournal.domain.dto.request.ReviewerInvitationRequest;
import com.bcd.ejournal.domain.dto.response.*;
import com.bcd.ejournal.domain.entity.*;
import com.bcd.ejournal.domain.enums.InvitationStatus;
import com.bcd.ejournal.domain.enums.ReviewReportStatus;
import com.bcd.ejournal.repository.InvitationRepository;
import com.bcd.ejournal.repository.PaperRepository;
import com.bcd.ejournal.repository.ReviewReportRepository;
import com.bcd.ejournal.repository.ReviewerRepository;
import com.bcd.ejournal.service.InvitationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvitationServiceImpl implements InvitationService {
    private final InvitationRepository invitationRepository;
    private final ReviewerRepository reviewerRepository;
    private final PaperRepository paperRepository;
    private final ReviewReportRepository reviewReportRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public InvitationServiceImpl(InvitationRepository invitationRepository, ReviewerRepository reviewerRepository, PaperRepository paperRepository, ReviewReportRepository reviewReportRepository, ModelMapper modelMapper) {
        this.invitationRepository = invitationRepository;
        this.reviewerRepository = reviewerRepository;
        this.paperRepository = paperRepository;
        this.reviewReportRepository = reviewReportRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void sendInvitation(Integer reviewerId, ReviewerInvitationRequest request) {
        // TODO: verify if reviewer is invitable
        // TODO: verify manager can send invitation of paperId
        Reviewer reviewer = reviewerRepository.findById(reviewerId)
                .orElseThrow(() -> new NullPointerException("Reviewer not found. Id: " + reviewerId));
        Paper paper = paperRepository.findById(request.getPaperId())
                .orElseThrow(() -> new NullPointerException("Paper not found. Id: " + request.getPaperId()));
        Invitation invitation = new Invitation();
        invitation.setInvitationId(0);
        invitation.setStatus(InvitationStatus.PENDING);
        invitation.setInviteDate(new Date(System.currentTimeMillis()));
        invitation.setReviewer(reviewer);
        invitation.setPaper(paper);

        invitationRepository.save(invitation);
    }

    @Override
    public List<InvitationReviewerResponse> listInvitationFromReviewer(Integer reviewerId) {
        Reviewer reviewer = reviewerRepository.findById(reviewerId)
                .orElseThrow(() -> new NullPointerException("Reviewer not found. Id: " + reviewerId));
        List<Invitation> invitations = reviewer.getInvitations();
        return invitations.stream()
                .map(this::toInvitationReviewerResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<InvitationPaperResponse> listInvitationFromPaper(Integer paperId) {
        // TODO: verify accountId or manager
        Paper paper = paperRepository.findById(paperId)
                .orElseThrow(() -> new NullPointerException("Paper not found. Id: " + paperId));

        List<Invitation> invitations = paper.getInvitations();
        return invitations.stream()
                .map(this::toInvitationPaperResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void updateStatus(Integer reviewerId, Integer invitationId, InvitationStatus status) {
        Invitation invitation = invitationRepository.findByIdAndReviewerId(invitationId, reviewerId)
                .orElseThrow(() -> new NullPointerException("Invitation not found. Id: " + invitationId));
        // TODO: only change invitation if status is pending
        invitation.setStatus(status);
        invitationRepository.save(invitation);

        Paper paper = invitation.getPaper();
        List<Invitation> acceptedInvitations = invitationRepository.findByPaperIdAndStatus(paper.getPaperId(), InvitationStatus.ACCEPTED);
        if (acceptedInvitations.size() == 3) {
            // create 3 new review reports to begin review process
            for (Invitation inv : acceptedInvitations) {
                ReviewReport reviewReport = new ReviewReport();

                reviewReport.setReviewReportId(0);
                reviewReport.setPaper(paper);
                reviewReport.setReviewer(inv.getReviewer());
                reviewReport.setStatus(ReviewReportStatus.PENDING);

                reviewReportRepository.save(reviewReport);
            }

            // change status of other invitation to cancel
            invitationRepository.updateInvitationStatusByPaperId(paper.getPaperId(), InvitationStatus.CANCEL);
        }
    }

    private InvitationPaperResponse toInvitationPaperResponse(Invitation invitation) {
        InvitationPaperResponse response = modelMapper.map(invitation, InvitationPaperResponse.class);
        Reviewer reviewer = invitation.getReviewer();
        response.setReviewerId(reviewer.getReviewerId());
        response.setReviewerName(reviewer.getAccount().getFullName());
        return response;
    }

    private InvitationReviewerResponse toInvitationReviewerResponse(Invitation invitation) {
        InvitationReviewerResponse response = modelMapper.map(invitation, InvitationReviewerResponse.class);
        PaperResponse paperResponse = fromPaper(invitation.getPaper());
        response.setPaper(paperResponse);
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
