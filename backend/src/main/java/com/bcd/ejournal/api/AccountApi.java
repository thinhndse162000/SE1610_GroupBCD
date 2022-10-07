	package com.bcd.ejournal.api;

import com.bcd.ejournal.configuration.jwt.payload.AccountJWTPayload;
import com.bcd.ejournal.domain.dto.request.AccountChangePasswordRequest;
import com.bcd.ejournal.domain.dto.request.AccountUpdateProfileRequest;
import com.bcd.ejournal.domain.dto.response.AccountProfileResponse;
import com.bcd.ejournal.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/account")
public class AccountApi {
    private final AccountService accountService;

    @Autowired
    public AccountApi(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/profile")
    public ResponseEntity<AccountProfileResponse> getProfile(@AuthenticationPrincipal AccountJWTPayload jwt) {
        AccountProfileResponse response = accountService.getProfile(jwt.getAccountID());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/profile")
    public ResponseEntity<AccountProfileResponse> updateProfile(@AuthenticationPrincipal AccountJWTPayload jwt, @Valid @RequestBody AccountUpdateProfileRequest request) {
        AccountProfileResponse response = accountService.updateProfile(jwt.getAccountID(), request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/password")
    public ResponseEntity<Void> updatePassword(@AuthenticationPrincipal AccountJWTPayload jwt, @Valid @RequestBody AccountChangePasswordRequest request) {
        accountService.changePassword(jwt.getAccountID(), request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<Void> archiveAccount(@AuthenticationPrincipal AccountJWTPayload jwt) {
        accountService.archiveAccount(jwt.getAccountID());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
