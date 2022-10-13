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
import com.bcd.ejournal.domain.dto.request.JournalCreateRequest;
import com.bcd.ejournal.domain.dto.request.JournalSearchRequest;
import com.bcd.ejournal.domain.dto.response.IssueResponse;
import com.bcd.ejournal.domain.dto.response.JournalResponse;
import com.bcd.ejournal.domain.dto.response.PaperResponse;
import com.bcd.ejournal.domain.dto.response.PublishResponse;
import com.bcd.ejournal.service.JournalService;
import com.bcd.ejournal.service.PublishService;

@RestController
@RequestMapping("/journal")
public class JournalApi {
    private final JournalService journalService;
    private final PublishService publishService;

    @Autowired
    public JournalApi(JournalService journalService, PublishService publishService) {
        this.journalService = journalService;
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
    public ResponseEntity<List<JournalResponse>> searchJournal(@RequestBody JournalSearchRequest request) {
        List<JournalResponse> responses = journalService.search(request);
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
}
