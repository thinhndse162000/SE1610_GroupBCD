package com.bcd.ejournal.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

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
    private int status;
    private List<AuthorResponse> authors;
    private JournalResponse journal;
}
