package com.bcd.ejournal.service.implementation;

import java.time.Year;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.bcd.ejournal.domain.dto.request.IssueCreateRequest;
import com.bcd.ejournal.domain.dto.response.IssueDetailResponse;
import com.bcd.ejournal.domain.dto.response.IssueResponse;
import com.bcd.ejournal.domain.dto.response.PublishResponse;
import com.bcd.ejournal.domain.entity.Account;
import com.bcd.ejournal.domain.entity.Issue;
import com.bcd.ejournal.domain.entity.Publish;
import com.bcd.ejournal.domain.exception.ConflictException;
import com.bcd.ejournal.domain.exception.MethodNotAllowedException;
import com.bcd.ejournal.repository.AccountRepository;
import com.bcd.ejournal.repository.IssueRepository;
import com.bcd.ejournal.repository.PublishRepository;
import com.bcd.ejournal.service.IssueService;
import com.bcd.ejournal.utils.DTOMapper;

@Service
public class IssueServiceImpl implements IssueService {
    private final AccountRepository accountRepository;
    private final IssueRepository issueRepository;
    private final PublishRepository publishRepository;
    private final DTOMapper dtoMapper;

    @Autowired
    public IssueServiceImpl(AccountRepository accountRepository, IssueRepository issueRepository,
            PublishRepository publishRepository, DTOMapper dtoMapper) {
        this.accountRepository = accountRepository;
        this.issueRepository = issueRepository;
        this.publishRepository = publishRepository;
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

    @Override
    public IssueResponse getLatestIssue(Integer journalId) {
        Issue latestIssue = getLatestIssueFromJournal(journalId);
        if (latestIssue != null) {
            return dtoMapper.toIssueResponse(latestIssue);
        }
        return null;
    }

    @Override
    public IssueResponse getLatestIssue(String slug) {
        Pageable pageable = PageRequest.of(0, 1, Sort.by("issueId"));

        Page<Issue> latestIssuePage = issueRepository.findFirstByJournalSlug(slug, pageable);
        
        if (latestIssuePage.getSize() != 0) {
            return dtoMapper.toIssueResponse(latestIssuePage.getContent().get(0));
        }
        return null;
    }

    @Override
    public IssueResponse getLatestIssueFromManager(Integer accountId) {
        Account acc = accountRepository.findById(accountId)
            .orElseThrow(() -> new NullPointerException("Manager not found. Id: " +  accountId));

        if (acc.getJournal() == null) {
            throw new NullPointerException("Manager not found. Id: " + accountId);
        }

        return dtoMapper.toIssueResponse(getLatestIssueFromJournal(acc.getJournal().getJournalId()));
    }

    @Override
    public IssueResponse getIssueByVolumeAndIssue(Integer journalId, Integer volume, Integer issue) {
        Issue issueObject = issueRepository.findByJournalIdAndVolumeAndIssue(journalId, volume, issue)
            .orElseThrow(() -> new NullPointerException("No issue found. JournalId: " + journalId + ", volume: " + volume + ", issue: " + issue));

        return dtoMapper.toIssueResponse(issueObject);
    }

    @Override
    public IssueResponse getIssueByVolumeAndIssue(String slug, Integer volume, Integer issue) {
        Issue issueObject = issueRepository.findByJournalSlugAndVolumeAndIssue(slug, volume, issue)
            .orElseThrow(() -> new NullPointerException("No issue found. Journal slug: " + slug + ", volume: " + volume + ", issue: " + issue));

        return dtoMapper.toIssueResponse(issueObject);
    }

    @Override
    @Transactional
    public void createIssue(Integer managerId, IssueCreateRequest request) {
        Account account = accountRepository.findById(managerId)
            .orElseThrow(() -> new NullPointerException("Manager not found. Id: " + managerId));

        if (account.getJournal() == null) {
            throw new MethodNotAllowedException("Account not allow to create issue. Id: " + managerId);
        }

        if (request.getEndDate().before(request.getStartDate())) {
            throw new ConflictException("End date cannot be before start date: " + request.getEndDate());
        }

        Issue latestIssue = getLatestIssueFromJournal(account.getJournal().getJournalId());
        Issue issue = new Issue();
        Integer currentYear = Year.now().getValue();

        // Set next volume and issue
        if (latestIssue != null) {
            if (request.getStartDate().before(latestIssue.getEndDate())) {
                throw new ConflictException("Start date cannot be before previous issue end date: " + latestIssue.getEndDate());
            }
            // First issue of new year
            if (latestIssue.getYear() != currentYear) {
                issue.setVolume(latestIssue.getVolume() + 1);
                issue.setIssue(1);
            } else {
                issue.setVolume(latestIssue.getVolume());
                issue.setIssue(latestIssue.getIssue() + 1);
            }
        } else {
            issue.setVolume(1);
            issue.setIssue(1);
        }

        issue.setYear(currentYear);
        issue.setStartDate(request.getStartDate());
        issue.setEndDate(request.getEndDate());
        issue.setJournal(account.getJournal());

        // Add paper to publish
        Integer totalPage = 0;
        for (Integer publishId : request.getPublishIds()) {
            Publish publish = publishRepository.findById(publishId)
                .orElseThrow(() -> new NullPointerException("Publish not found. Id: " + publishId));

            totalPage += publish.getPaper().getNumberOfPage();
            issue.getPublishes().add(publish);
            publish.setIssue(issue);
        }

        issue.setIssueId(0);
        issue.setNumberOfPage(totalPage);

        issueRepository.save(issue);
    }

    private Issue getLatestIssueFromJournal(Integer journalId) {
        Pageable pageable = PageRequest.of(0, 1, Sort.by("issueId"));

        Page<Issue> latestIssuePage = issueRepository.findFirstByJournalId(journalId, pageable);
        
        if (latestIssuePage.getSize() != 0) {
            return latestIssuePage.getContent().get(0);
        }
        return null;
    }
}
