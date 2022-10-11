package com.bcd.ejournal.domain.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JournalSearchRequest {
	private String name;
	private int journalId;
	private int paperId;
	private int issueId;
	
}
