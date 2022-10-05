package com.bcd.ejournal.service.implementation;

import com.bcd.ejournal.domain.dto.request.JournalCreateRequest;
import com.bcd.ejournal.domain.dto.response.IssueResponse;
import com.bcd.ejournal.domain.dto.response.JournalResponse;
import com.bcd.ejournal.domain.entity.Issue;
import com.bcd.ejournal.domain.entity.Journal;
import com.bcd.ejournal.domain.enums.JournalStatus;
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
        // TODO: trim white space
        Journal journal = modelMapper.map(request, Journal.class);
        journal.setJournalId(0);
        journal.setStatus(JournalStatus.OPEN);
        journal = journalRepository.save(journal);
        return modelMapper.map(journal, JournalResponse.class);
    }

    @Override
    public JournalResponse getJournal(Integer journalId) {
        // TODO: return journal detail
        Journal journal = journalRepository.findById(journalId)
                .orElseThrow(() -> new NullPointerException("Journal not found: " + journalId));
        return modelMapper.map(journal, JournalResponse.class);
    }

    @Override
    public List<JournalResponse> search(String name) {
        return StreamSupport.stream(journalRepository.findByNameContains(name).spliterator(), false)
                .map((journal) -> modelMapper.map(journal, JournalResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<IssueResponse> listAllIssues(Integer journalId) {
        Iterable<Issue> issues = issueRepository.findAllByJournalId(journalId);
        return StreamSupport.stream(issues.spliterator(), false)
                .map(this::fromIssue)
                .collect(Collectors.toList());
    }

    @Override
    public JournalResponse updateJournal(Integer journalId, JournalCreateRequest request) {
        // TODO: verify admin
        Journal journal = journalRepository.findById(journalId)
                .orElseThrow(() -> new NullPointerException("Journal not found: " + journalId));
        modelMapper.map(request, journal);
        journal = journalRepository.save(journal);
        return modelMapper.map(journal, JournalResponse.class);
    }

    @Override
    public void archiveJournal(Integer journalId) {
        // TODO: verify admin
        Journal journal = journalRepository.findById(journalId)
                .orElseThrow(() -> new NullPointerException("Journal not found: " + journalId));
        journal.setStatus(JournalStatus.ARCHIVED);
        journalRepository.save(journal);
    }

    private IssueResponse fromIssue(Issue issue) {
        IssueResponse issueResponse = modelMapper.map(issue, IssueResponse.class);
        issueResponse.setJournal(modelMapper.map(issue.getJournal(), JournalResponse.class));
        return issueResponse;
    }
}
