package com.bcd.ejournal.domain.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.bcd.ejournal.domain.dto.request.PaperSubmitRequest;
import com.bcd.ejournal.domain.enums.PaperStatus;

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
public class Paper implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PaperId")
    private int paperId;
    private String title;
    @Column(name = "Abstract")
    private String summary;
    private Timestamp submitTime;
    private String linkPDF;
    private Integer numberOfPage;
    private Integer grade;
    @Enumerated(EnumType.STRING)
    private PaperStatus status;
    @Column(name = "[Round]")
    private Integer round;

    @ManyToMany
    @JoinTable(name = "PaperField", joinColumns = @JoinColumn(name = "PaperId", referencedColumnName = "PaperId"), inverseJoinColumns = @JoinColumn(name = "FieldId", referencedColumnName = "FieldId"))
    private List<Field> fields;

    @ManyToOne
    @JoinColumn(name = "AuthorId", nullable = false)
    private Author author;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "JournalId", nullable = false)
    private Journal journal;

	@OneToMany(mappedBy = "paper", fetch = FetchType.LAZY)
	private List<Invitation> invitations;

    @OneToMany(mappedBy = "paper")
    private List<ReviewReport> reviewReports;

	public Paper(PaperSubmitRequest model) {
		this.title = model.getTitle();
		this.summary = model.getSummary();
	}
}
