package com.bcd.ejournal.domain.entity;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewReport {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int reviewReportId;
	private int paperId;
	private int reviewerId;
	private Timestamp date;
	private int grade;
	private int condentiality;
	private String text;
	private int status;
}
