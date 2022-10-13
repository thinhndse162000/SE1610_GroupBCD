package com.bcd.ejournal.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer issueId;
    private String volume;
    private String issue;
    private Date startDate;
    private Date endDate;
    private int numberOfPage;

    @ManyToOne
    @JoinColumn(name = "journalId", nullable = false)
    private Journal journal;
}
