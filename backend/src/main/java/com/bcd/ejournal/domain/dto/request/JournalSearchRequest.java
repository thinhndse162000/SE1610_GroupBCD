package com.bcd.ejournal.domain.dto.request;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JournalSearchRequest {
	private String name;
	private String introduction;
    private String organization;
    private String issn;
    private Integer journalId;
    private Integer page;
	
}
