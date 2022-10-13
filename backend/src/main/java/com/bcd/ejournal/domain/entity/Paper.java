package com.bcd.ejournal.domain.entity;

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
<<<<<<< HEAD
public class Paper {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PaperId")
	private int paperId;
	private String title;
	@Column(name = "Abstract")
	private String summary;
	private Timestamp submitTime;
	private String linkPDF;
	private int numberOfPage;
	@Enumerated(EnumType.STRING)
	private PaperStatus status;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "AuthorID", nullable = false)
	private Author author;
	@ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
	@JoinColumn(name = "JournalID", nullable = false)
	private Journal journal;
=======
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
    @ManyToOne
    @JoinColumn(name = "AuthorId", nullable = false)
    private Author author;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "JournalId", nullable = false)
    private Journal journal;
>>>>>>> fa7bc9628dcf3d0fa2ef64cf90a8ecb9602c3fb0

	@OneToMany(mappedBy = "paper", fetch = FetchType.LAZY)
	private List<Invitation> invitations;

	public Paper(PaperSubmitRequest model) {
		this.title = model.getTitle();
		this.summary = model.getSummary();
	}

<<<<<<< HEAD
=======
    @OneToMany(mappedBy = "paper")
    private List<ReviewReport> reviewReports;

    public Paper(PaperSubmitRequest model) {
        this.title = model.getTitle();
        this.summary = model.getSummary();
    }
>>>>>>> fa7bc9628dcf3d0fa2ef64cf90a8ecb9602c3fb0
}
