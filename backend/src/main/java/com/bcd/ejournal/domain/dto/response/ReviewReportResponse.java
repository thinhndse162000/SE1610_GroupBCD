package com.bcd.ejournal.domain.dto.response;

import com.bcd.ejournal.domain.enums.ReviewReportStatus;
import com.bcd.ejournal.domain.enums.ReviewReportVerdict;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewReportResponse {
    private Integer reviewReportId;
    private Timestamp reviewDate;
    private Integer grade;
    private Integer confidentiality;
    private ReviewReportVerdict verdict;
    private String note;
    private ReviewReportStatus status;
    private ReviewerResponse reviewer;
}
