package com.bcd.ejournal.domain.dto.request;

import com.bcd.ejournal.domain.enums.ReviewReportStatus;
import com.bcd.ejournal.domain.enums.ReviewReportVerdict;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewReportSearchFilterRequest {
    private String title;
    private Integer reviewerId;
    private Integer reviewReportId;
    private ReviewReportVerdict verdict;
    private Integer page;
    private ReviewReportStatus status;
}
