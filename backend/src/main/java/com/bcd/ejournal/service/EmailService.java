package com.bcd.ejournal.service;

import com.bcd.ejournal.domain.dto.request.AccountEmailVerify;
import com.bcd.ejournal.domain.entity.Account;
import com.bcd.ejournal.domain.entity.EmailDetail;

public interface EmailService {
    // Method
    // To send a simple email
    String sendSimpleMail(EmailDetail details);

    // Method
    // To send an email with attachment
    String sendMailWithAttachment(EmailDetail details);

    String sendEmailSignup(EmailDetail detail, String email);

    String sendEmailInvitaion(EmailDetail detail);

    String sendEmailSumbitPaper(Account acc);

    String sendEmailForgetPassword(AccountEmailVerify req);
    
    String sendEmailReviewReport(String mail);
}
