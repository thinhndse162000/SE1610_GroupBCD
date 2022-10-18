package com.bcd.ejournal.api;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bcd.ejournal.configuration.jwt.payload.AccountJWTPayload;
import com.bcd.ejournal.domain.dto.request.IssueCreateRequest;
import com.bcd.ejournal.domain.dto.request.JournalCreateRequest;
import com.bcd.ejournal.domain.dto.request.JournalSearchRequest;
import com.bcd.ejournal.domain.dto.request.PaperSearchRequest;
import com.bcd.ejournal.domain.dto.response.IssueResponse;
import com.bcd.ejournal.domain.dto.response.JournalResponse;
import com.bcd.ejournal.domain.dto.response.PagingResponse;
import com.bcd.ejournal.domain.dto.response.PaperResponse;
import com.bcd.ejournal.domain.dto.response.PublishResponse;
import com.bcd.ejournal.domain.enums.PublishAccessLevel;
import com.bcd.ejournal.domain.enums.PaperStatus;
import com.bcd.ejournal.service.IssueService;
import com.bcd.ejournal.service.JournalService;
import com.bcd.ejournal.service.PublishService;

@RestController
@RequestMapping("/journal")
public class JournalApi {
    private final JournalService journalService;
    private final IssueService issueService;
    private final PublishService publishService;

    @Autowired
    public JournalApi(JournalService journalService, IssueService issueService, PublishService publishService) {
        this.journalService = journalService;
        this.issueService = issueService;
        this.publishService = publishService;
    }

    @PostMapping
    public ResponseEntity<JournalResponse> createJournal(@RequestBody JournalCreateRequest request) {
        JournalResponse response = journalService.createJournal(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{journalId}")
    public ResponseEntity<JournalResponse> getJournal(@Valid @PathVariable Integer journalId) {
        JournalResponse response = journalService.getJournal(journalId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<JournalResponse> getJournalFromSlug(@PathVariable String slug) {
        JournalResponse response = journalService.getJournal(slug);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<JournalResponse> getJournalFromManager(@AuthenticationPrincipal AccountJWTPayload payload) {
        Integer accountId = payload.getAccountId();
        JournalResponse response = journalService.getJournalManager(accountId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/search")
    public ResponseEntity<PagingResponse> searchJournal(@RequestBody JournalSearchRequest request) {
        PagingResponse responses = journalService.search(request);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @PutMapping("/{journalId}")
    public ResponseEntity<JournalResponse> updateJournal(@PathVariable Integer journalId, @Valid @RequestBody JournalCreateRequest request) {
        JournalResponse response = journalService.updateJournal(journalId, request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{journalId}/issue")
    public ResponseEntity<List<IssueResponse>> getAllIssues(@PathVariable Integer journalId) {
        List<IssueResponse> response = journalService.listAllIssues(journalId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/slug/{slug}/issue")
    public ResponseEntity<List<IssueResponse>> getAllIssuesFromSlug(@PathVariable String slug) {
        List<IssueResponse> response = journalService.listAllIssues(slug);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{journalId}")
    public ResponseEntity<Void> archiveJournal(@PathVariable Integer journalId) {
        journalService.archiveJournal(journalId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{journalId}/publish")
    public ResponseEntity<List<PublishResponse>> getAllPaper(@PathVariable Integer journalId) {
        List<PublishResponse> responses = publishService.getPublishFromJournal(journalId);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @GetMapping("/slug/{slug}/publish")
    public ResponseEntity<List<PublishResponse>> getAllPublish(@PathVariable String slug) {
        List<PublishResponse> responses = publishService.getPublishFromJournal(slug);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @GetMapping("/paper")
    public ResponseEntity<List<PaperResponse>> getAllPaperSentToJournal(@AuthenticationPrincipal AccountJWTPayload payload) {
        Integer accountId = payload.getAccountId();
        List<PaperResponse> responses = journalService.getAllPaper(accountId);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @GetMapping("/paper/accepted")
    public ResponseEntity<List<PaperResponse>> getAllAcceptedPaperSentToJournal(@AuthenticationPrincipal AccountJWTPayload payload) {
        Integer accountId = payload.getAccountId();
        PaperSearchRequest request = new PaperSearchRequest();
        request.setStatus(PaperStatus.ACCEPTED);

        List<PaperResponse> responses = journalService.getAllPaper(accountId, request);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @PostMapping("/paper/search")
    public ResponseEntity<List<PaperResponse>> searchPaperSentToJournal(@AuthenticationPrincipal AccountJWTPayload payload, @RequestBody PaperSearchRequest request) {
        Integer accountId = payload.getAccountId();
        List<PaperResponse> responses = journalService.getAllPaper(accountId, request);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @PostMapping("/issue")
    public ResponseEntity<Void> publishIssue(@AuthenticationPrincipal AccountJWTPayload payload, @RequestBody IssueCreateRequest request) {
        issueService.createIssue(payload.getAccountId(), request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/issue")
    public ResponseEntity<List<IssueResponse>> getIssueFromManager(@AuthenticationPrincipal AccountJWTPayload payload) {
        List<IssueResponse> response = journalService.listAllIssuesFromManager(payload.getAccountId());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{journalId}/volume/{volume}/issue/{issue}")
    public ResponseEntity<IssueResponse> getIssue(@PathVariable Integer journalId, @PathVariable Integer volume, @PathVariable Integer issue) {
        IssueResponse response = issueService.getIssueByVolumeAndIssue(journalId, volume, issue);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/slug/{slug}/volume/{volume}/issue/{issue}")
    public ResponseEntity<IssueResponse> getIssue(@PathVariable String slug, @PathVariable Integer volume, @PathVariable Integer issue) {
        IssueResponse response = issueService.getIssueByVolumeAndIssue(slug, volume, issue);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/slug/{slug}/issue/latest")
    public ResponseEntity<IssueResponse> getLatestIssue(@PathVariable String slug) {
        IssueResponse response = issueService.getLatestIssue(slug);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/issue/latest")
    public ResponseEntity<IssueResponse> getLatestIssueFromManager(@AuthenticationPrincipal AccountJWTPayload payload) {
        IssueResponse response = issueService.getLatestIssueFromManager(payload.getAccountId());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/publish/{id}")
    public ResponseEntity<PublishResponse> updateAccessLevel(@AuthenticationPrincipal AccountJWTPayload payload, @PathVariable(name = "id") Integer publishId, @RequestBody PublishAccessLevel accessLevel) {
        PublishResponse response = publishService.updateAccessLevel(payload.getAccountId(), publishId, accessLevel);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
