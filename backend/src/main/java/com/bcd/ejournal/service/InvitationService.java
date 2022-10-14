package com.bcd.ejournal.service;

import com.bcd.ejournal.domain.dto.request.ReviewerInvitationRequest;
import com.bcd.ejournal.domain.dto.response.InvitationPaperResponse;
import com.bcd.ejournal.domain.dto.response.InvitationReviewerResponse;
import com.bcd.ejournal.domain.enums.InvitationStatus;

import java.util.List;

public interface InvitationService {
    InvitationPaperResponse sendInvitation(Integer accountId, Integer reviewerId, ReviewerInvitationRequest request);

    InvitationReviewerResponse getInvitation(Integer accountId, Integer invitationId);

    List<InvitationReviewerResponse> listInvitationFromReviewer(Integer reviewerId);

    List<InvitationPaperResponse> listInvitationFromPaper(Integer accountId, Integer paperId);

    void updateStatus(Integer reviewerId, Integer invitationId, InvitationStatus status);
}
