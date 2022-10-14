package com.bcd.ejournal.domain.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Reviewer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ReviewerId;
    private boolean invitable;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "ReviewerId")
    private Account account;
    
	 @OneToMany(mappedBy = "reviewer") private List<Invitation> invitations;

    @OneToMany(mappedBy = "reviewer")
    private List<Invitation> invitations1;

    @OneToMany(mappedBy = "reviewer")
    private List<ReviewReport> reviewReports;

}
