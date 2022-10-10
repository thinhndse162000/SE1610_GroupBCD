package com.bcd.ejournal.domain.dto.request;

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
    private int pageNumber;
}
