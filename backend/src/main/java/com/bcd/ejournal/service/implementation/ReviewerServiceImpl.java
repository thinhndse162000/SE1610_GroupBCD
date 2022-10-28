package com.bcd.ejournal.service.implementation;

import com.bcd.ejournal.domain.dto.response.ReviewerResponse;
import com.bcd.ejournal.domain.entity.Reviewer;
import com.bcd.ejournal.repository.ReviewerRepository;
import com.bcd.ejournal.service.ReviewerService;
import com.bcd.ejournal.utils.DTOMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewerServiceImpl implements ReviewerService {
    private final ReviewerRepository reviewerRepository;
    private final DTOMapper dtoMapper;

    @Autowired
    public ReviewerServiceImpl(ReviewerRepository accountRepository, DTOMapper dtoMapper) {
        this.reviewerRepository = accountRepository;
        this.dtoMapper = dtoMapper;
    }

    @Override
    public List<ReviewerResponse> searchReviewerAvailable(Integer paperId, String name) {
        List<Reviewer> reviewer = reviewerRepository.findAvailableReviewer(paperId);

        return reviewer.stream()
                .map(dtoMapper::toReviewerResponse)
                .filter(reviewerResponse -> reviewerResponse.getFullName().contains(name))
                .collect(Collectors.toList());
    }
}
