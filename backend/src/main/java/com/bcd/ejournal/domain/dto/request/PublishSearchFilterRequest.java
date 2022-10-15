package com.bcd.ejournal.domain.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PublishSearchFilterRequest {
    private Integer issue;
    private int paperId;
    private Integer page;
    private Integer volume;
}
