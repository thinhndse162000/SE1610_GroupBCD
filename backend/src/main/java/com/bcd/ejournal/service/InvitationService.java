package com.bcd.ejournal.service;

import com.bcd.ejournal.domain.dto.request.ReviewerInvitationRequest;
import com.bcd.ejournal.domain.dto.response.InvitationPaperResponse;
import com.bcd.ejournal.domain.dto.response.InvitationReviewerResponse;
import com.bcd.ejournal.domain.enumstatus.InvitationStatus;

import java.util.List;

public interface InvitationService {
    void sendInvitation(Integer reviewerID, ReviewerInvitationRequest request);

    List<InvitationReviewerResponse> listInvitationFromReviewer(Integer reviewerID);
    List<InvitationPaperResponse> listInvitationFromPaper(Integer paperID);

    void updateStatus(Integer reviewerID, Integer invitationID, InvitationStatus status);
}
