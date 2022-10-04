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
public class InvitationReviewerResponse {
    // TODO: check return field again
    private Integer paperID;
    private String paperTitle;
    private Integer journalID;
    private String journalName;
    private Date inviteDate;
    private InvitationStatus status;
}
