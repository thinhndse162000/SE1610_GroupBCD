package com.bcd.ejournal.domain.entity;

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
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer authorID;
    private String introduction;
    private String education;
    private String address;
    private String profileImage;

    @OneToOne
    @MapsId
    @JoinColumn(name = "AuthorID")
    private Account account;

    @ManyToMany(mappedBy = "authors")
    private List<Paper> papers;
}
