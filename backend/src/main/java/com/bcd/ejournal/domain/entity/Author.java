package com.bcd.ejournal.domain.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

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
    
	/*
	 * @OneToOne(mappedBy = "author") private Paper paper;
	 * 
	 * @OneToMany(mappedBy = "author") private List<Paper> papers;
	 * 
	 * @ManyToMany(mappedBy = "authors") private List<Paper> papers;
	 */
}
