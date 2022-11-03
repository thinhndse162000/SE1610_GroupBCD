package com.bcd.ejournal.service;

import com.bcd.ejournal.domain.dto.request.ReviewerUpdateFieldRequest;
import com.bcd.ejournal.domain.dto.response.ReviewerResponse;

import java.util.List;

public interface ReviewerService {
    ReviewerResponse getReviewerSetting(Integer accountId);

    List<ReviewerResponse> searchReviewerAvailable(Integer paperId, String name);

    void updateInvitable(Integer accountId, Boolean invitable);

    void updateField(Integer accountId, ReviewerUpdateFieldRequest request);
}
