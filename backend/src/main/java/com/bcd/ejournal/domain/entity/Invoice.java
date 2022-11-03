package com.bcd.ejournal.domain.entity;

import java.sql.Timestamp;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Invoice {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer invoiceId;
	private String paymentMethod;
	private Timestamp paymentTime;
	private Timestamp endDate;
	private double amount;
	
	@ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "JournalId", nullable = false)
    private Journal journal;
	
	@ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "accountId", nullable = false)
    private Account account;
}
