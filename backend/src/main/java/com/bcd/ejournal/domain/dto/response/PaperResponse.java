package com.bcd.ejournal.domain.dto.response;

import com.bcd.ejournal.domain.enums.PaperStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

import com.bcd.ejournal.domain.entity.Field;

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
    private Integer round;
    private int numberOfPage;
    private int grade;
    private List<Field> fields;
    private PaperStatus status;
    private AuthorResponse authors;
    private JournalResponse journal;
}
