package com.bcd.ejournal.service;

import com.bcd.ejournal.domain.entity.EmailDetail;

public interface EmailService {
	// Method
	// To send a simple email
	String sendSimpleMail(EmailDetail details);

	// Method
	// To send an email with attachment
	String sendMailWithAttachment(EmailDetail details);
}
