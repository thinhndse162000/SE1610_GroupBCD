package com.bcd.ejournal.domain.entity;

import com.bcd.ejournal.domain.enums.JournalStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Journal {
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
