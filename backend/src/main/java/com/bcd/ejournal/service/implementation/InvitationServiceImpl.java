package com.bcd.ejournal.service.implementation;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bcd.ejournal.domain.dto.request.InvitationSearchFilterRequest;
import com.bcd.ejournal.domain.dto.request.ReviewerInvitationRequest;
import com.bcd.ejournal.domain.dto.response.InvitationPaperResponse;
import com.bcd.ejournal.domain.dto.response.InvitationReviewerResponse;
import com.bcd.ejournal.domain.dto.response.PaperResponse;
import com.bcd.ejournal.domain.entity.Invitation;
import com.bcd.ejournal.domain.entity.Paper;
import com.bcd.ejournal.domain.entity.ReviewReport;
import com.bcd.ejournal.domain.entity.Reviewer;
import com.bcd.ejournal.domain.enums.InvitationStatus;
import com.bcd.ejournal.domain.enums.PaperStatus;
import com.bcd.ejournal.domain.enums.ReviewReportStatus;
import com.bcd.ejournal.domain.exception.ForbiddenException;
import com.bcd.ejournal.domain.exception.MethodNotAllowedException;
import com.bcd.ejournal.repository.InvitationRepository;
import com.bcd.ejournal.repository.PaperRepository;
import com.bcd.ejournal.repository.ReviewReportRepository;
import com.bcd.ejournal.repository.ReviewerRepository;
import com.bcd.ejournal.service.InvitationService;
import com.bcd.ejournal.utils.DTOMapper;

@Service
public class InvitationServiceImpl implements InvitationService {
    private final InvitationRepository invitationRepository;
    private final ReviewerRepository reviewerRepository;
    private final PaperRepository paperRepository;
    private final ReviewReportRepository reviewReportRepository;
    private final DTOMapper dtoMapper;

    @Autowired
    public InvitationServiceImpl(InvitationRepository invitationRepository, ReviewerRepository reviewerRepository, PaperRepository paperRepository, ReviewReportRepository reviewReportRepository, DTOMapper dtoMapper) {
        this.invitationRepository = invitationRepository;
        this.reviewerRepository = reviewerRepository;
        this.paperRepository = paperRepository;
        this.reviewReportRepository = reviewReportRepository;
        this.dtoMapper = dtoMapper;
    }

    @Override
    public InvitationPaperResponse sendInvitation(Integer accountId, Integer reviewerId, ReviewerInvitationRequest request) {
        Reviewer reviewer = reviewerRepository.findById(reviewerId)
                .orElseThrow(() -> new NullPointerException("Reviewer not found. Id: " + reviewerId));
        // check if reviewer invitable
        if (!reviewer.isInvitable()) {
            throw new MethodNotAllowedException("Reviewer not invitable. Id:" + reviewerId);
        }

        Paper paper = paperRepository.findById(request.getPaperId())
                .orElseThrow(() -> new NullPointerException("Paper not found. Id: " + request.getPaperId()));
        // check if manager has permission
        if (paper.getJournal().getManager().getAccountId() != accountId) {
            throw new ForbiddenException("Paper is not sent to manager's journal. Paper Id: " + request.getPaperId());
        }
        // check paper is in pending status
        if (paper.getStatus() != PaperStatus.PENDING) {
            throw new MethodNotAllowedException("Paper is not in PENDING. Id: " + request.getPaperId());
        }
        // check reviewer cannot review his own paper
        if (reviewerId == paper.getAuthor().getAuthorId()) {
            throw new MethodNotAllowedException("Reviewer cannot review his own paper. Reviewer Id: " + reviewerId);
        }

        Invitation invitation = new Invitation();
        invitation.setInvitationId(0);
        invitation.setStatus(InvitationStatus.PENDING);
        invitation.setInviteDate(new Date(System.currentTimeMillis()));
        invitation.setReviewer(reviewer);
        invitation.setPaper(paper);

        invitationRepository.save(invitation);
        return dtoMapper.toInvitationPaperResponse(invitation);
    }

    @Override
    public InvitationReviewerResponse getInvitation(Integer accountId, Integer invitationId) {
        Invitation invitation = invitationRepository.findByIdAndReviewerId(invitationId, accountId)
            .orElseThrow(() -> new NullPointerException("Invitation not found. Id: " + invitationId));
        return dtoMapper.toInvitationReviewerResponse(invitation);
    }

    @Override
    public List<InvitationReviewerResponse> listInvitationFromReviewer(Integer reviewerId) {
        Reviewer reviewer = reviewerRepository.findById(reviewerId)
                .orElseThrow(() -> new NullPointerException("Reviewer not found. Id: " + reviewerId));
        List<Invitation> invitations = reviewer.getInvitations();
        return invitations.stream()
                .map(dtoMapper::toInvitationReviewerResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<InvitationPaperResponse> listInvitationFromPaper(Integer accountId, Integer paperId) {
        Paper paper = paperRepository.findById(paperId)
                .orElseThrow(() -> new NullPointerException("Paper not found. Id: " + paperId));
        // check if manager has the ownership of the paper
        if (paper.getJournal().getManager().getAccountId() != accountId) {
            throw new MethodNotAllowedException("Paper is not sent to manager's journal. Id: " + paperId);
        }

        List<Invitation> invitations = paper.getInvitations();
        return invitations.stream()
                .map(dtoMapper::toInvitationPaperResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void updateStatus(Integer reviewerId, Integer invitationId, InvitationStatus status) {
        Invitation invitation = invitationRepository.findByIdAndReviewerId(invitationId, reviewerId)
                .orElseThrow(() -> new NullPointerException("Invitation not found. Id: " + invitationId));

        // check if is in PENDING status
        if (invitation.getStatus() != InvitationStatus.PENDING) {
            throw new MethodNotAllowedException("Invitation is not in PENDING status. Id: " + invitationId);
        }

        invitation.setStatus(status);
        invitationRepository.save(invitation);

        Paper paper = invitation.getPaper();
        List<Invitation> acceptedInvitations = invitationRepository.findByPaperIdAndStatus(paper.getPaperId(), InvitationStatus.ACCEPTED);

        // Create new review report
        ReviewReport reviewReport = new ReviewReport();
        reviewReport.setReviewReportId(0);
        reviewReport.setPaper(paper);
        reviewReport.setReviewer(invitation.getReviewer());
        reviewReport.setStatus(ReviewReportStatus.PENDING);

        reviewReportRepository.save(reviewReport);
        if (acceptedInvitations.size() == 3) {
            // update paper status
            paper.setStatus(PaperStatus.REVIEWING);
            paperRepository.save(paper);

            // change status of other invitation to cancel
            invitationRepository.updateInvitationStatusByPaperId(paper.getPaperId(), InvitationStatus.CANCEL);
        }
    }
}
