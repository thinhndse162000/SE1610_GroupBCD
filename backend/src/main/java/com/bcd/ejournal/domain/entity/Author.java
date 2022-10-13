package com.bcd.ejournal.domain.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Author implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer authorId;
    private String introduction;
    private String education;
    private String address;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
<<<<<<< HEAD
    @JoinColumn(name = "AuthorID")
    @JsonIgnore
=======
    @JoinColumn(name = "AuthorId")
>>>>>>> fa7bc9628dcf3d0fa2ef64cf90a8ecb9602c3fb0
    private Account account;

    @OneToMany(mappedBy = "author")
    private List<Paper> papers = new ArrayList<>();
}
