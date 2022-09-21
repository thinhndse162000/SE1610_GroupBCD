package com.bcd.ejournal.api;

import com.bcd.ejournal.domain.dto.request.AccountLoginRequest;
import com.bcd.ejournal.domain.dto.request.AccountSignupRequest;
import com.bcd.ejournal.domain.dto.response.AccountTokenResponse;
import com.bcd.ejournal.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthenticationApi {
    private final AccountService accountService;

    @Autowired
    public AuthenticationApi(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping
    public ResponseEntity<AccountTokenResponse> login(@Valid @RequestBody AccountLoginRequest request) {
        AccountTokenResponse response = accountService.login(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<AccountTokenResponse> signup(@Valid @RequestBody AccountSignupRequest request) {
        AccountTokenResponse response = accountService.signup(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
