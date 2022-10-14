package com.bcd.ejournal.service;

import com.bcd.ejournal.domain.dto.response.IssueDetailResponse;

public interface IssueService {
    IssueDetailResponse getIssue(Integer issueId);
}
