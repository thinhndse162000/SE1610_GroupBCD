package com.bcd.ejournal.api;

import com.bcd.ejournal.domain.dto.request.JournalCreateRequest;
import com.bcd.ejournal.domain.dto.response.IssueResponse;
import com.bcd.ejournal.domain.dto.response.JournalResponse;
import com.bcd.ejournal.domain.entity.Journal;
import com.bcd.ejournal.service.JournalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/journal")
public class JournalApi {
    private final JournalService journalService;

    @Autowired
    public JournalApi(JournalService journalService) {
        this.journalService = journalService;
    }

    // TODO: admin authorization
    @PostMapping
    public ResponseEntity<JournalResponse> createJournal(@RequestBody JournalCreateRequest request) {
        JournalResponse response = journalService.createJournal(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{journalID}")
    public ResponseEntity<JournalResponse> getJournal(@PathVariable Integer journalID) {
        JournalResponse response = journalService.getJournal(journalID);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // TODO: admin authorization
    @PutMapping("/{journalID}")
    public ResponseEntity<JournalResponse> updateJournal(@PathVariable Integer journalID, @RequestBody JournalCreateRequest request) {
        JournalResponse response = journalService.updateJournal(journalID, request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{journalID}/issue")
    public ResponseEntity<List<IssueResponse>> getAllIssues(@PathVariable Integer journalID) {
        List<IssueResponse> response = journalService.listAllIssues(journalID);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // TODO: admin authorization
    @DeleteMapping("/{journalID}")
    public ResponseEntity<Void> archiveJournal(@PathVariable Integer journalID) {
        journalService.archiveJournal(journalID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
