package com.bcd.ejournal.domain.entity;

import com.bcd.ejournal.domain.enums.InvitationStatus;
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
public class Invitation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer invitationId;
    private Date inviteDate;
    @Enumerated(EnumType.STRING)
    private InvitationStatus status;

    @ManyToOne
    @JoinColumn(name = "ReviewerId", nullable = false)
    private Reviewer reviewer;

    @ManyToOne
    @JoinColumn(name = "PaperId", nullable = false)
    private Paper paper;
}
