package com.bcd.ejournal.api;

import com.bcd.ejournal.configuration.jwt.payload.AccountJWTPayload;
import com.bcd.ejournal.domain.dto.response.PaperResponse;
import com.bcd.ejournal.service.AccountService;
import com.bcd.ejournal.service.PaperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/author")
public class AuthorApi {
    private final AccountService accountService;
    private final PaperService paperService;

    @Autowired
    public AuthorApi(AccountService accountService, PaperService paperService) {
        this.accountService = accountService;
        this.paperService = paperService;
    }

    @GetMapping("/paper")
    public ResponseEntity<List<PaperResponse>> getAllPaper(@AuthenticationPrincipal AccountJWTPayload payload) {
        Integer authorID = payload.getAccountID();
        List<PaperResponse> papers = paperService.getAllPaperFromAuthor(authorID);
        return new ResponseEntity<>(papers, HttpStatus.OK);
    }
}
