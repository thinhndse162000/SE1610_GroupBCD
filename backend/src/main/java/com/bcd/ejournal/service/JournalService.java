package com.bcd.ejournal.service;

import com.bcd.ejournal.domain.dto.request.JournalCreateRequest;
import com.bcd.ejournal.domain.dto.response.IssueResponse;
import com.bcd.ejournal.domain.dto.response.JournalResponse;
import com.bcd.ejournal.domain.dto.response.PaperResponse;

import java.util.List;

public interface JournalService {
    JournalResponse createJournal(JournalCreateRequest request);

    JournalResponse getJournal(Integer journalId);

    JournalResponse getJournalManager(Integer accountId);

    List<JournalResponse> search(String name);

    List<IssueResponse> listAllIssues(Integer journalId);

    JournalResponse updateJournal(Integer journalId, JournalCreateRequest request);

    void archiveJournal(Integer journalId);

    List<PaperResponse> getAllPaper(Integer accountId);
}
