package com.bcd.ejournal.domain.entity;

import java.sql.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer issueId;
    private Integer volume;
    private Integer issue;
    private Date startDate;
    private Date endDate;
    private Integer numberOfPage;

    @ManyToOne
    @JoinColumn(name = "journalId", nullable = false)
    private Journal journal;

    @OneToMany(mappedBy = "issue")
    private List<Publish> publishes;
}
