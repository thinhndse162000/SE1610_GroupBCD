package com.bcd.ejournal.domain.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaperSearchRequest {
    private int paperId;
    private String title;
}
