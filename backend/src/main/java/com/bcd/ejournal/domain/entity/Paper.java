package com.bcd.ejournal.domain.entity;

import com.bcd.ejournal.domain.dto.request.PaperSubmitRequest;
import com.bcd.ejournal.domain.enumstatus.PaperStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

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
    private int numberOfPage;
    @Enumerated(EnumType.STRING)
    private PaperStatus status;
    @ManyToOne
    @JoinColumn(name = "AuthorID", nullable = false)
    private Author author;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "JournalID", nullable = false)
    private Journal journal;

    @OneToMany(mappedBy = "paper")
    private List<Invitation> invitations;

    public Paper(PaperSubmitRequest model) {
        this.title = model.getTitle();
        this.summary = model.getSummary();
    }
}
