package com.bcd.ejournal.domain.entity;

import com.bcd.ejournal.domain.dto.request.PaperSubmitRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
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
    private int status;
    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "AuthorPaper",
            joinColumns = @JoinColumn(name = "paperID"),
            inverseJoinColumns = @JoinColumn(name = "authorID")
    )
    private List<Author> authors = new ArrayList<>();
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "JournalID", nullable = false)
    private Journal journal;

    public Paper(PaperSubmitRequest model) {
        this.title = model.getTitle();
        this.summary = model.getSummary();
    }
}
