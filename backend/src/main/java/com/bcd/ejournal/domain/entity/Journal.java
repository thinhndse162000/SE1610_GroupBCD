package com.bcd.ejournal.domain.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.bcd.ejournal.domain.enums.JournalStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Journal implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer journalID;
    private String name;
    private String introduction;
    private String organization;
    private String issn;
    
    @Enumerated(EnumType.STRING)
    private JournalStatus status;

    @OneToMany(mappedBy = "journal", cascade = CascadeType.MERGE)
    private List<Issue> issues;

    @OneToMany(mappedBy = "journal", cascade = CascadeType.MERGE)
    private List<Paper> papers;
}
