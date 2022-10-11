package com.bcd.ejournal.service;

import java.util.List;

import com.bcd.ejournal.domain.dto.request.JournalCreateRequest;
import com.bcd.ejournal.domain.dto.request.JournalSearchRequest;
import com.bcd.ejournal.domain.dto.response.IssueResponse;
import com.bcd.ejournal.domain.dto.response.JournalResponse;

public interface JournalService {
    JournalResponse createJournal(JournalCreateRequest request);

    JournalResponse getJournal(Integer journalID);

    List<JournalResponse> search(JournalSearchRequest request);

    List<IssueResponse> listAllIssues(Integer journalID);

    JournalResponse updateJournal(Integer journalID, JournalCreateRequest request);

    void archiveJournal(Integer journalID);
}
