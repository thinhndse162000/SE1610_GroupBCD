package com.bcd.ejournal.service;

import com.bcd.ejournal.domain.dto.request.AccountChangeForgotPassword;
import com.bcd.ejournal.domain.dto.request.AccountChangePasswordRequest;
import com.bcd.ejournal.domain.dto.request.AccountLoginRequest;
import com.bcd.ejournal.domain.dto.request.AccountSignupRequest;
import com.bcd.ejournal.domain.dto.request.AccountUpdateProfileRequest;
import com.bcd.ejournal.domain.dto.request.TokenRequest;
import com.bcd.ejournal.domain.dto.response.AccountProfileResponse;
import com.bcd.ejournal.domain.dto.response.AccountTokenResponse;
import com.bcd.ejournal.domain.dto.response.AuthorResponse;

public interface AccountService {
    AccountTokenResponse login(AccountLoginRequest req);

    AccountTokenResponse signup(AccountSignupRequest req);

    void changePassword(Integer id, AccountChangePasswordRequest req);

    AccountProfileResponse updateProfile(Integer id, AccountUpdateProfileRequest req);

    AccountProfileResponse getProfile(Integer id);

    void archiveAccount(Integer id);

    AuthorResponse getAuthorFromSlug(String slug);
    
    void verify(TokenRequest request);
    
    void forgotPassword(String token, AccountChangeForgotPassword req);
}
