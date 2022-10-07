package com.bcd.ejournal.domain.dto.request;

import com.bcd.ejournal.domain.enums.ReviewReportVerdict;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReviewReportSubmitRequest {
    private Integer grade;
    private Integer confidentiality;
    private String note;
    private ReviewReportVerdict verdict;
}
