package com.bcd.ejournal.domain.dto.request;

import java.sql.Timestamp;

import com.bcd.ejournal.domain.enums.PaperStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaperSearchRequest {
    private int paperId;
    private String title;
    private String summary;
    private int authorId;
    private int journalId;
    private Timestamp submitTime;
    private PaperStatus status;
    private Integer page;
}
