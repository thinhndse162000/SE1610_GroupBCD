package com.bcd.ejournal.domain.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class InvitationSearchFilterRequest {
	private String title;
	private Integer reviewerId;
	private Integer page;
}
