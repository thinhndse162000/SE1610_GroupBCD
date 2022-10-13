package com.bcd.ejournal.domain.dto.request;

import java.sql.Date;

import com.bcd.ejournal.domain.enums.PaperStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaperSearchRequest {
    private String title;
    private Integer journalId;
    private Integer authorId;
    private PaperStatus status;
    private Date startDate;
    private Integer page;
}
