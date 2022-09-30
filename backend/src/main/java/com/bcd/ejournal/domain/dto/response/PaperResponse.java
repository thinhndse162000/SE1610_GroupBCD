package com.bcd.ejournal.domain.dto.response;

import com.bcd.ejournal.domain.enumstatus.PaperStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaperResponse {
    private int paperId;
    private String title;
    private String summary;
    private Timestamp submitTime;
    private String linkPDF;
    private int numberOfPage;
    private PaperStatus status;
    private AuthorResponse authors;
    private JournalResponse journal;
}
