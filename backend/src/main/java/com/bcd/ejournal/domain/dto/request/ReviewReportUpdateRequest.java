package com.bcd.ejournal.domain.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewReportUpdateRequest {
	private int reviewReportId;
	private int grade;
	private int condentiality;
	private String text;
}
