package com.bcd.ejournal.service;

import com.bcd.ejournal.domain.dto.request.JournalCreateRequest;
import com.bcd.ejournal.domain.dto.response.IssueResponse;
import com.bcd.ejournal.domain.dto.response.JournalResponse;

import java.util.List;

public interface JournalService {
    JournalResponse createJournal(JournalCreateRequest request);

    JournalResponse getJournal(Integer journalID);

    List<JournalResponse> search(String name);

    List<IssueResponse> listAllIssues(Integer journalID);

    JournalResponse updateJournal(Integer journalID, JournalCreateRequest request);

    void archiveJournal(Integer journalID);
}
