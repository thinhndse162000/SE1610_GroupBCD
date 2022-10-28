package com.bcd.ejournal.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bcd.ejournal.configuration.jwt.payload.AccountJWTPayload;
import com.bcd.ejournal.domain.dto.request.PaperSearchRequest;
import com.bcd.ejournal.domain.dto.response.AuthorResponse;
import com.bcd.ejournal.domain.dto.response.PagingResponse;
import com.bcd.ejournal.domain.dto.response.PaperDetailResponse;
import com.bcd.ejournal.domain.dto.response.PaperResponse;
import com.bcd.ejournal.domain.dto.response.PublishResponse;
import com.bcd.ejournal.service.AccountService;
import com.bcd.ejournal.service.PaperService;
import com.bcd.ejournal.service.PublishService;

@RestController
@RequestMapping("/author")
public class AuthorApi {
    private final AccountService accountService;
    private final PaperService paperService;
    private final PublishService publishService;

    @Autowired
    public AuthorApi(AccountService accountService, PaperService paperService, PublishService publishService) {
        this.accountService = accountService;
        this.paperService = paperService;
        this.publishService = publishService;
    }

    @GetMapping("/{slug}")
    public ResponseEntity<AuthorResponse> getAuthorFromSlug(@PathVariable String slug) {
        AuthorResponse response = accountService.getAuthorFromSlug(slug);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}/publish")
    public ResponseEntity<List<PublishResponse>> getPublish(@PathVariable Integer id) {
        List<PublishResponse> responses = publishService.getPublishFromAuthor(id);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @GetMapping("/slug/{slug}/publish")
    public ResponseEntity<List<PublishResponse>> getPublishFromSlug(@PathVariable String slug) {
        List<PublishResponse> responses = publishService.getPublishFromAuthor(slug);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @GetMapping("/paper")
    public ResponseEntity<List<PaperResponse>> getAllPaper(@AuthenticationPrincipal AccountJWTPayload payload) {
        Integer authorId = payload.getAccountId();
        List<PaperResponse> papers = paperService.getAllPaperFromAuthor(authorId);
        return new ResponseEntity<>(papers, HttpStatus.OK);
    }

    @PostMapping("/paper/search")
    public ResponseEntity<PagingResponse> searchPaper(@AuthenticationPrincipal AccountJWTPayload payload, @RequestBody PaperSearchRequest request) {
        Integer authorId = payload.getAccountId();
        request.setAuthorId(authorId);
        PagingResponse papers = paperService.searchByRequest(request);
        return new ResponseEntity<>(papers, HttpStatus.OK);
    }

    @GetMapping("/paper/{id}")
    public ResponseEntity<PaperDetailResponse> getPaper(@AuthenticationPrincipal AccountJWTPayload payload, @PathVariable(name = "id") Integer paperId) {
        Integer authorId = payload.getAccountId();
        PaperDetailResponse response = paperService.getPaper(paperId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
