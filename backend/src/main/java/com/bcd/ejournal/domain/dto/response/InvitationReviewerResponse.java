package com.bcd.ejournal.domain.dto.response;

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
    private Integer paperID;
    private String paperTitle;
    private Integer journalID;
    private String journalName;
    private Date inviteDate;
    private Boolean status;
}
