package com.bcd.ejournal.service;

import java.util.List;

import com.bcd.ejournal.domain.dto.request.InvitationSearchFilterRequest;
import com.bcd.ejournal.domain.dto.request.ReviewerInvitationRequest;
import com.bcd.ejournal.domain.dto.response.InvitationPaperResponse;
import com.bcd.ejournal.domain.dto.response.InvitationReviewerResponse;
import com.bcd.ejournal.domain.dto.response.PagingResponse;
import com.bcd.ejournal.domain.enums.InvitationStatus;

public interface InvitationService {
    InvitationPaperResponse sendInvitation(Integer accountId, Integer reviewerId, ReviewerInvitationRequest request);

    InvitationReviewerResponse getInvitation(Integer accountId, Integer invitationId);

    List<InvitationReviewerResponse> listInvitationFromReviewer(Integer reviewerId);

    List<InvitationPaperResponse> listInvitationFromPaper(Integer accountId, Integer paperId);

    void updateStatus(Integer reviewerId, Integer invitationId, InvitationStatus status);

    PagingResponse searchFilterInvitation(InvitationSearchFilterRequest filterRequest);

    void cleanDueInvitation();

    void notifyReviewer();
}
