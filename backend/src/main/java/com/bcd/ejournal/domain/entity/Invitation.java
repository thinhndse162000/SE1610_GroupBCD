package com.bcd.ejournal.domain.entity;

import com.bcd.ejournal.domain.enums.InvitationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

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
    private Integer invitationID;
    @CreatedDate
    private Date inviteDate;
    @Enumerated(EnumType.STRING)
    private InvitationStatus status;

    @ManyToOne
    @JoinColumn(name = "ReviewerID", nullable = false)
    private Reviewer reviewer;

    @ManyToOne
    @JoinColumn(name = "PaperID", nullable = false)
    private Paper paper;
}
