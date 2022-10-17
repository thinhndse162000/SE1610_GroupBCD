package com.bcd.ejournal.service;

import com.bcd.ejournal.domain.dto.request.IssueCreateRequest;
import com.bcd.ejournal.domain.dto.response.IssueDetailResponse;
import com.bcd.ejournal.domain.dto.response.IssueResponse;

public interface IssueService {
    IssueDetailResponse getIssue(Integer issueId);

    IssueResponse getLatestIssue(Integer journalId);

    IssueResponse getLatestIssue(String slug);

    IssueResponse getLatestIssueFromManager(Integer accountId);

    IssueResponse getIssueByVolumeAndIssue(Integer journalId, Integer volume, Integer issue);

    IssueResponse getIssueByVolumeAndIssue(String slug, Integer volume, Integer issue);

    void createIssue(Integer managerId, IssueCreateRequest request);
}
