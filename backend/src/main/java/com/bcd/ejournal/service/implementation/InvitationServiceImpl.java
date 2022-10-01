package com.bcd.ejournal.service.implementation;

import com.bcd.ejournal.domain.dto.request.ReviewerInvitationRequest;
import com.bcd.ejournal.domain.dto.response.InvitationPaperResponse;
import com.bcd.ejournal.domain.dto.response.InvitationReviewerResponse;
import com.bcd.ejournal.domain.entity.Invitation;
import com.bcd.ejournal.domain.entity.Paper;
import com.bcd.ejournal.domain.entity.Reviewer;
import com.bcd.ejournal.domain.enumstatus.InvitationStatus;
import com.bcd.ejournal.repository.InvitationRepository;
import com.bcd.ejournal.repository.PaperRepository;
import com.bcd.ejournal.repository.ReviewerRepository;
import com.bcd.ejournal.service.InvitationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvitationServiceImpl implements InvitationService {
    private final InvitationRepository invitationRepository;
    private final ReviewerRepository reviewerRepository;
    private final PaperRepository paperRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public InvitationServiceImpl(InvitationRepository invitationRepository, ReviewerRepository reviewerRepository, PaperRepository paperRepository, ModelMapper modelMapper) {
        this.invitationRepository = invitationRepository;
        this.reviewerRepository = reviewerRepository;
        this.paperRepository = paperRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void sendInvitation(Integer reviewerID, ReviewerInvitationRequest request) {
        Reviewer reviewer = reviewerRepository.findById(reviewerID)
                .orElseThrow(() -> new NullPointerException("Reviewer not found. ID: " + reviewerID));
        Paper paper = paperRepository.findById(request.getPaperID())
                .orElseThrow(() -> new NullPointerException("Paper not found. ID" + request.getPaperID()));
        Invitation invitation = new Invitation();
        invitation.setInvitationID(0);
        invitation.setStatus(null);
        invitation.setReviewer(reviewer);
        invitation.setPaper(paper);

        invitationRepository.save(invitation);
    }

    @Override
    public List<InvitationReviewerResponse> listInvitationFromReviewer(Integer reviewerID) {
        Reviewer reviewer = reviewerRepository.findById(reviewerID)
                .orElseThrow(() -> new NullPointerException("Reviewer not found. ID: " + reviewerID));
        List<Invitation> invitations = reviewer.getInvitations();
        return invitations.stream()
                .map(invitation -> modelMapper.map(invitation, InvitationReviewerResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<InvitationPaperResponse> listInvitationFromPaper(Integer paperID) {
        Paper paper = paperRepository.findById(paperID)
                .orElseThrow(() -> new NullPointerException("Paper not found. ID: " + paperID));

        List<Invitation> invitations = paper.getInvitations();
        return invitations.stream()
                .map(invitation -> modelMapper.map(invitation, InvitationPaperResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public void updateStatus(Integer reviewerID, Integer invitationID, InvitationStatus status) {
        Invitation invitation = invitationRepository.findByIdAndReviewerId(invitationID, reviewerID)
                .orElseThrow(() -> new NullPointerException("Invitation not found. ID: " + invitationID));
        invitation.setStatus(status);
        // TODO: if 3 accept then begin review process
        invitationRepository.save(invitation);
    }
}
