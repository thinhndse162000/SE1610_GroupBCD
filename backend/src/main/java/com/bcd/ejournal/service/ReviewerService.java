package com.bcd.ejournal.service;

import com.bcd.ejournal.domain.dto.response.ReviewerResponse;

import java.util.List;

public interface ReviewerService {
    List<ReviewerResponse> searchReviewerAvailable(Integer paperId, String name);
}
