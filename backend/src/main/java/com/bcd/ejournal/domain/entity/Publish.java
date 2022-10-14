package com.bcd.ejournal.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import com.bcd.ejournal.domain.enums.PublishAccessLevel;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Publish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer publishId;
    private Date publishDate;
    @Enumerated(EnumType.STRING)
    private PublishAccessLevel accessLevel;

    @ManyToOne
    @JoinColumn(name = "issueId", referencedColumnName = "issueId")
    private Issue issue;

    @OneToOne
    @JoinColumn(name = "paperId", referencedColumnName = "paperId")
    private Paper paper;
}
