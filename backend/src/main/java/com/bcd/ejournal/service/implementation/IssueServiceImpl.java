package com.bcd.ejournal.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bcd.ejournal.domain.dto.response.IssueDetailResponse;
import com.bcd.ejournal.domain.dto.response.PublishResponse;
import com.bcd.ejournal.domain.entity.Issue;
import com.bcd.ejournal.repository.IssueRepository;
import com.bcd.ejournal.service.IssueService;
import com.bcd.ejournal.utils.DTOMapper;

@Service
public class IssueServiceImpl implements IssueService {
    private final IssueRepository issueRepository;
    private final DTOMapper dtoMapper;

    @Autowired
    public IssueServiceImpl(IssueRepository issueRepository, DTOMapper dtoMapper) {
        this.issueRepository = issueRepository;
        this.dtoMapper = dtoMapper;
    }

    @Override
    public IssueDetailResponse getIssue(Integer issueId) {
        Issue issue = issueRepository.findById(issueId)
            .orElseThrow(() -> new NullPointerException("Issue not found. Id: " + issueId));
        IssueDetailResponse response = new IssueDetailResponse();
        response.setIssue(dtoMapper.toIssueResponse(issue));
        List<PublishResponse> publishResponses = issue.getPublishes().stream()
            .map(dtoMapper::toPublishResponse)
            .collect(Collectors.toList());
        response.setPublishes(publishResponses);
        return response;
    }
}
