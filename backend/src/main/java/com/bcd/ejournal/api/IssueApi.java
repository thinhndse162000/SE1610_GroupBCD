package com.bcd.ejournal.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bcd.ejournal.domain.dto.response.IssueDetailResponse;
import com.bcd.ejournal.service.IssueService;

@RestController
@RequestMapping("/issue")
public class IssueApi {
    private final IssueService issueService;

    @Autowired
    public IssueApi(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping("/{issueId}")
    public ResponseEntity<IssueDetailResponse> getIssue(@PathVariable Integer issueId) {
        IssueDetailResponse response = issueService.getIssue(issueId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    } 
}
