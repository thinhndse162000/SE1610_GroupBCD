package com.bcd.ejournal.domain.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.bcd.ejournal.domain.dto.request.PaperSubmitRequest;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Paper implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PaperId")
	private int paperId;
	
	private String title ;
	
	@Column(name = "Abstract")
	private String summary;
	
	private Timestamp submitTime ;
	
	private String linkPDF ;
	
	private int numberOfPage ;
	
	private int status ;
	
	private int journalId ;
	
	public Paper(PaperSubmitRequest model) {
		this.title = model.getTitle();
		this.summary = model.getSummary();	
	}
	/*
	 * @OneToOne
	 * 
	 * @JoinColumn(name = "authorID", nullable = false) private Author author;
	 * 
	 * @ManyToOne
	 * 
	 * @JoinColumn(name = "authorID", nullable = false) private Author author;
	 * 
	 * @ManyToMany
	 * 
	 * @JoinTable( name = "AuthorPaper", joinColumns = @JoinColumn(name = "paperID")
	 * inverseJoinColumns = @JoinColumn(name = "authorID") ) private List<Author>
	 * authors;
	 */

}
