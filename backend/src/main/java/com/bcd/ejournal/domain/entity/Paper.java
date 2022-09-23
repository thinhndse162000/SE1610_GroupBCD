package com.bcd.ejournal.domain.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.bcd.ejournal.domain.dto.request.PaperSubmitRequest;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Paper {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int paperId ;
	private String title ;
	@Column(name = "Abstract")
	private String sumary;
	private Timestamp submitTime ;
	private String linkPDF ;
	private int numberOfPage ;
	private int status ;
	private int journalId ;
	public Paper(PaperSubmitRequest model) {
		this.title = model.getTitle();
		this.sumary = model.getSumary();
		this.journalId = model.getJournalId();
		
	}
}
