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
    private Timestamp reviewDate;
    private int grade;
    private int confidentiality;
    private ReviewReportVerdict verdict;
    private String note;
    private ReviewReportStatus status;
    private ReviewerResponse reviewer;
    // TODO: paper detail
}
