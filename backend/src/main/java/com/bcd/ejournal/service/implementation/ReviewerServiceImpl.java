package com.bcd.ejournal.service.implementation;

import com.bcd.ejournal.domain.dto.response.ReviewerResponse;
import com.bcd.ejournal.domain.entity.Reviewer;
import com.bcd.ejournal.repository.ReviewerRepository;
import com.bcd.ejournal.service.ReviewerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewerServiceImpl implements ReviewerService {
    public final ReviewerRepository reviewerRepository;

    @Autowired
    public ReviewerServiceImpl(ReviewerRepository accountRepository) {
        this.reviewerRepository = accountRepository;
    }

    @Override
    public List<ReviewerResponse> searchReviewerAvailable(Integer paperId, String name) {
        List<Reviewer> reviewer = reviewerRepository.findAvailableReviewer(paperId);
        return reviewer.stream()
                .map(this::fromReviewer)
                .filter(reviewerResponse -> reviewerResponse.getFullName().contains(name))
                .collect(Collectors.toList());
    }

    private ReviewerResponse fromReviewer(Reviewer reviewer) {
        ReviewerResponse response = new ReviewerResponse();
        response.setReviewerId(reviewer.getReviewerId());
        response.setFullName(reviewer.getAccount().getFullName());
        return response;
    }
}
