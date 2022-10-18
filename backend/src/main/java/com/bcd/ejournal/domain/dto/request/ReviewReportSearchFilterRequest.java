package com.bcd.ejournal.domain.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewReportSearchFilterRequest {
    private Integer reviewerId;
    private Integer confidentiality;
    private Integer grade;
    private Integer reviewReportId;
    private Integer page;
}
