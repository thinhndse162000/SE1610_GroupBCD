package com.bcd.ejournal.service;

import java.util.List;

import com.bcd.ejournal.domain.dto.request.JournalCreateRequest;
import com.bcd.ejournal.domain.dto.request.JournalSearchRequest;
import com.bcd.ejournal.domain.dto.request.PaperSearchRequest;
import com.bcd.ejournal.domain.dto.response.IssueResponse;
import com.bcd.ejournal.domain.dto.response.JournalResponse;
import com.bcd.ejournal.domain.dto.response.PaperResponse;

public interface JournalService {
    JournalResponse createJournal(JournalCreateRequest request);

    JournalResponse getJournal(Integer journalId);

    JournalResponse getJournal(String slug);

    JournalResponse getJournalManager(Integer accountId);

    List<JournalResponse> search(JournalSearchRequest request);

    List<IssueResponse> listAllIssues(Integer journalId);

    List<IssueResponse> listAllIssues(String slug);

    JournalResponse updateJournal(Integer journalId, JournalCreateRequest request);

    void archiveJournal(Integer journalId);

    List<PaperResponse> getAllPaper(Integer accountId, PaperSearchRequest request);

    List<PaperResponse> getAllPaper(Integer accountId);
}
