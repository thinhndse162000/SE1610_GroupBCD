package com.bcd.ejournal.domain.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReviewReportSubmitRequest {
    private int grade;
    private int confidentiality;
    private String note;
}
