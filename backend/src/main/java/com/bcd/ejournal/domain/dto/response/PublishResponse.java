package com.bcd.ejournal.domain.dto.response;

import java.sql.Date;

import com.bcd.ejournal.domain.enums.PublishAccessLevel;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PublishResponse {
    private Integer publishId;
    private Integer ordinalNumber;
    private PaperResponse paper;
    private IssueResponse issue;
    private PublishAccessLevel accessLevel;
    private Date publishDate;
}
