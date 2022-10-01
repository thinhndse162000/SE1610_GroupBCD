package com.bcd.ejournal.api;

import com.bcd.ejournal.configuration.jwt.payload.AccountJWTPayload;
import com.bcd.ejournal.domain.dto.request.JournalCreateRequest;
import com.bcd.ejournal.domain.dto.response.IssueResponse;
import com.bcd.ejournal.domain.dto.response.JournalResponse;
import com.bcd.ejournal.domain.dto.response.PaperResponse;
import com.bcd.ejournal.service.JournalService;
import com.bcd.ejournal.service.PaperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/journal")
public class JournalApi {
    private final JournalService journalService;
    private final PaperService paperService;

    @Autowired
    public JournalApi(JournalService journalService, PaperService paperService) {
        this.journalService = journalService;
        this.paperService = paperService;
    }

    // TODO: admin authorization
    @PostMapping
    public ResponseEntity<JournalResponse> createJournal(@RequestBody JournalCreateRequest request) {
        JournalResponse response = journalService.createJournal(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{journalID}")
    public ResponseEntity<JournalResponse> getJournal(@Valid @PathVariable Integer journalID) {
        JournalResponse response = journalService.getJournal(journalID);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<JournalResponse>> searchJournal(@RequestParam String name) {
        List<JournalResponse> responses = journalService.search(name);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    // TODO: admin authorization
    @PutMapping("/{journalID}")
    public ResponseEntity<JournalResponse> updateJournal(@PathVariable Integer journalID, @Valid @RequestBody JournalCreateRequest request) {
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

    @GetMapping("/{journalID}/publish")
    public ResponseEntity<List<PaperResponse>> getAllPaper(@PathVariable Integer journalID) {
        // TODO: move to publishService
        List<PaperResponse> papers = paperService.getAllPaperFromJournal(journalID);
        return new ResponseEntity<>(papers, HttpStatus.OK);
    }

    // TODO: remove journalID, change it to something else
    // TODO: Manager role authorization
    @GetMapping("/paper")
    public ResponseEntity<List<PaperResponse>> getAllPaperSentToJournal(@AuthenticationPrincipal AccountJWTPayload accountJWTPayload) {
        // TODO: validate right manager
        return null;
    }
}
