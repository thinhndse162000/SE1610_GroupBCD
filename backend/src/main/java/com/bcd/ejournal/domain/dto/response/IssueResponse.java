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
    private String volume;
    private String issue;
    private Date startDate;
    private Date endDate;
    private int numberOfPages;
    private JournalResponse journal;
}
