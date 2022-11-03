package com.bcd.ejournal.domain.dto.response;

import java.util.List;

import com.bcd.ejournal.domain.entity.Field;
import com.bcd.ejournal.domain.enums.JournalStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JournalResponse {
    private String journalId;
    private String name;
    private String introduction;
    private String organization;
    private String issn;
    private Integer numberOfRound;
    private Integer numberOfReviewer;
    private String slug;
    private Integer price;
    private JournalStatus status;
    private String managerEmail;
    private List<Field> fields;
}
