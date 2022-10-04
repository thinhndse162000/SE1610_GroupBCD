package com.bcd.ejournal.domain.dto.response;

import com.bcd.ejournal.domain.enums.InvitationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InvitationPaperResponse {
    private Integer invitationId;
    private Integer reviewerID;
    private String reviewerName;
    private Date inviteDate;
    private InvitationStatus status;
}
