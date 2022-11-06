package com.bcd.ejournal.service.implementation;

import java.io.File;
import java.util.Optional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.bcd.ejournal.configuration.jwt.JWTService;
import com.bcd.ejournal.domain.dto.request.AccountEmailVerify;
import com.bcd.ejournal.domain.entity.Account;
import com.bcd.ejournal.domain.entity.EmailDetail;
import com.bcd.ejournal.repository.AccountRepository;
import com.bcd.ejournal.service.EmailService;

@Service
public class EmailServiceImp implements EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JWTService jwtService;

    @Value("${spring.mail.username}")
    private String sender;

    @Override
    @Async
    public String sendSimpleMail(EmailDetail details) {
        // TODO Auto-generated method stub
        try {

            // Creating a simple mail message
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            // Setting up necessary details
            mailMessage.setFrom(sender);
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject(details.getSubject());

            // Sending the mail
            javaMailSender.send(mailMessage);
            return "Mail Sent Successfully...";
        }

        // Catch block to handle the exceptions
        catch (Exception e) {
            return "Error while Sending Mail";
        }
    }

    @Override
    @Async
    public String sendMailWithAttachment(EmailDetail details) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {

            // Setting multipart as true for attachments to
            // be send
            mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setText(details.getMsgBody());
            mimeMessageHelper.setSubject(details.getSubject());

            // Adding the attachment
            FileSystemResource file = new FileSystemResource(new File(details.getAttachment()));

            mimeMessageHelper.addAttachment(file.getFilename(), file);

            // Sending the mail
            javaMailSender.send(mimeMessage);
            return "Mail sent Successfully";
        }

        // Catch block to handle MessagingException
        catch (MessagingException e) {

            // Display message when exception occurred
            return "Error while sending mail!!!";
        }
    }

    @Override
    @Async
    public String sendEmailSignup(EmailDetail detail, String email) {
        try {
            String subject = "Sign Up ";
            detail.setSubject(subject);
            // Creating a simple mail message
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            // Setting up necessary details
            mailMessage.setFrom(sender);
            mailMessage.setTo(email);
            mailMessage.setText(detail.getToken());
            mailMessage.setSubject(detail.getSubject());
            // Sending the mail
            javaMailSender.send(mailMessage);
            return "Mail Sent Successfully...";
        }

        // Catch block to handle the exceptions
        catch (Exception e) {
            return "Error while Sending Mail";
        }
    }

    @Override
    @Async
    public String sendEmailInvitaion(EmailDetail details) {
        try {

            // Creating a simple mail message
            String subject = "Review Paper Invitation ";
            details.setSubject(subject);
            String mgs = "You have Paper to review";
            details.setMsgBody(mgs);
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            // Setting up necessary details
            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject(details.getSubject());

            // Sending the mail
            javaMailSender.send(mailMessage);
            return "Mail Sent Successfully...";
        }

        // Catch block to handle the exceptions
        catch (Exception e) {
            return "Error while Sending Mail";
        }
    }

    @Override
    @Async
    public String sendEmailSumbitPaper(Account acc) {
        try {
            EmailDetail details = new EmailDetail();
            // Creating a simple mail message
            String subject = "New Paper Have Submition ";
            details.setSubject(subject);
            String mgs = "Author have new paper submition";
            details.setMsgBody(mgs);
            details.setRecipient(acc.getEmail());
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            // Setting up necessary details
            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject(details.getSubject());

            // Sending the mail
            javaMailSender.send(mailMessage);
            return "Mail Sent Successfully...";
        } catch (Exception e) {
            return "Error while Sending Mail";
        }
    }

    @Override
    @Async
    public String sendEmailForgetPassword(AccountEmailVerify req) {
        try {
            Optional<Account> accountOpt = accountRepository.findByEmail(req.getEmail());
            if (accountOpt.isPresent()) {
                EmailDetail details = new EmailDetail();
                details.setSubject("Forgot Password Token");
                // Creating a simple mail message
                SimpleMailMessage mailMessage = new SimpleMailMessage();
                details.setRecipient(req.getEmail());
                details.setToken("Please Click to link to Create New Password" + " "
                        + "http://localhost:3000/account/forgot?token="
                        + jwtService.jwtShrotDuration(accountOpt.get()));
                // Setting up necessary details
                mailMessage.setFrom(sender);
                mailMessage.setTo(details.getRecipient());
                mailMessage.setText(details.getToken());
                mailMessage.setSubject(details.getSubject());

                // Sending the mail
                javaMailSender.send(mailMessage);
            }
            return "Mail Sent Successfully...";
        } catch (Exception e) {
            return "Error while Sending Mail";
        }
    }

	@Override
    @Async
	public String sendEmailReviewReport(String mail) {
		 try {
			 	EmailDetail details = new EmailDetail();
			 	details.setSubject("Someone have review");
			 	details.setMsgBody("Reviewer have submit review report");
	            details.setRecipient(mail);
	            SimpleMailMessage mailMessage = new SimpleMailMessage();

	            // Setting up necessary details
	            mailMessage.setFrom(sender);
	            mailMessage.setTo(details.getRecipient());
	            mailMessage.setText(details.getMsgBody());
	            mailMessage.setSubject(details.getSubject());

	            // Sending the mail
	            javaMailSender.send(mailMessage);
	            return "Mail Sent Successfully...";
	        }

	        // Catch block to handle the exceptions
	        catch (Exception e) {
	            return "Error while Sending Mail";
	        }
	}
}
