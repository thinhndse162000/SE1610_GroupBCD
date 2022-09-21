package com.bcd.ejournal.service.implementation;

import com.bcd.ejournal.domain.dto.request.JournalCreateRequest;
import com.bcd.ejournal.domain.dto.response.IssueResponse;
import com.bcd.ejournal.domain.dto.response.JournalResponse;
import com.bcd.ejournal.domain.entity.Issue;
import com.bcd.ejournal.domain.entity.Journal;
import com.bcd.ejournal.repository.IssueRepository;
import com.bcd.ejournal.repository.JournalRepository;
import com.bcd.ejournal.service.JournalService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class JournalServiceImpl implements JournalService {
    private final JournalRepository journalRepository;
    private final IssueRepository issueRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public JournalServiceImpl(JournalRepository journalRepository, IssueRepository issueRepository, ModelMapper modelMapper) {
        this.journalRepository = journalRepository;
        this.issueRepository = issueRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public JournalResponse createJournal(JournalCreateRequest request) {
        Journal journal = modelMapper.map(request, Journal.class);
        journal.setJournalID(0);
        journal = journalRepository.save(journal);
        return modelMapper.map(journal, JournalResponse.class);
    }

    @Override
    public JournalResponse getJournal(Integer journalID) {
        Journal journal = journalRepository.findById(journalID)
                .orElseThrow(() -> new NullPointerException("Journal not found: " + journalID));
        return modelMapper.map(journal, JournalResponse.class);
    }

    @Override
    public List<IssueResponse> listAllIssues(Integer journalID) {
        Iterable<Issue> issues = issueRepository.findAllByJournalID(journalID);
        return StreamSupport.stream(issues.spliterator(), false)
                .map((issue) -> modelMapper.map(issue, IssueResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public JournalResponse updateJournal(Integer journalID, JournalCreateRequest request) {
        Journal journal = journalRepository.findById(journalID)
                .orElseThrow(() -> new NullPointerException("Journal not found: " + journalID));
        modelMapper.map(request, journal);
        journal = journalRepository.save(journal);
        return modelMapper.map(journal, JournalResponse.class);
    }

    @Override
    public void archiveJournal(Integer journalID) {
        Journal journal = journalRepository.findById(journalID)
                .orElseThrow(() -> new NullPointerException("Journal not found: " + journalID));
        journal.setStatus(false);
        journalRepository.save(journal);
    }
}