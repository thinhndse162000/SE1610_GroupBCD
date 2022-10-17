package com.bcd.ejournal.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IssueResponse {
    private Integer issueId;
    private Integer volume;
    private Integer issue;
    private Date startDate;
    private Date endDate;
    private Integer year;
    private int numberOfPage;
    private int numberOfPaper;
    private JournalResponse journal;
}
