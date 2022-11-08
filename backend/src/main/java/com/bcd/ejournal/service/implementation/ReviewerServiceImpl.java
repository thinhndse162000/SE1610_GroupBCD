package com.bcd.ejournal.service.implementation;

import com.bcd.ejournal.domain.dto.request.ReviewerUpdateFieldRequest;
import com.bcd.ejournal.domain.dto.response.ReviewerResponse;
import com.bcd.ejournal.domain.entity.Reviewer;
import com.bcd.ejournal.repository.FieldRepository;
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
    private final FieldRepository fieldRepository;

    @Autowired
    public ReviewerServiceImpl(ReviewerRepository reviewerRepository, DTOMapper dtoMapper, FieldRepository fieldRepository) {
        this.reviewerRepository = reviewerRepository;
        this.dtoMapper = dtoMapper;
        this.fieldRepository = fieldRepository;
    }

    @Override
    public ReviewerResponse getReviewerSetting(Integer accountId) {
        Reviewer reviewer = reviewerRepository.findById(accountId)
            .orElseThrow(() -> new NullPointerException("Reviewer not found. Id: " + accountId));
        return dtoMapper.toReviewerResponse(reviewer);
    }

    @Override
    public List<ReviewerResponse> searchReviewerAvailable(Integer paperId, String name) {
        List<Reviewer> reviewer = reviewerRepository.findAvailableReviewer(paperId);

        return reviewer.stream()
                .map(dtoMapper::toReviewerResponse)
                .filter(reviewerResponse -> reviewerResponse.getFullName().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }

    @Override
    public void updateInvitable(Integer accountId, Boolean invitable) {
        Reviewer reviewer = reviewerRepository.findById(accountId)
            .orElseThrow(() -> new NullPointerException("Reviewer not found. Id: " + accountId));

        reviewer.setInvitable(invitable);
        reviewerRepository.save(reviewer);
    }

    @Override
    public void updateField(Integer accountId, ReviewerUpdateFieldRequest request) {
        Reviewer reviewer = reviewerRepository.findById(accountId)
            .orElseThrow(() -> new NullPointerException("Reviewer not found. Id: " + accountId));

        reviewer.setFields(fieldRepository.findAllByFieldIdIn(request.getFieldId()));
        reviewerRepository.save(reviewer);
    }
}
