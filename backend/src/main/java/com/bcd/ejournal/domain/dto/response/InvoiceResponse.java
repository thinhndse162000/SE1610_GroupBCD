package com.bcd.ejournal.domain.dto.response;

import java.sql.Timestamp;

import com.bcd.ejournal.domain.entity.Account;
import com.bcd.ejournal.domain.entity.Journal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceResponse {

	private Integer invoiceId;
	private String paymentMethod;
	private Timestamp paymentTime;
	private Timestamp endDate;
	private double amount;
	private Journal journal;
	private Account account;
}
