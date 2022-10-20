package com.bcd.ejournal.domain.dto.request;

import com.bcd.ejournal.domain.enums.InvitationStatus;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class InvitationSearchFilterRequest {
	private String title;
	private Integer reviewerId;
    private InvitationStatus status;
	private Integer page;
}
