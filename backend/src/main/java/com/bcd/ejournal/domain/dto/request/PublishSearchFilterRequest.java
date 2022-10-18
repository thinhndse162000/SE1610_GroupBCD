package com.bcd.ejournal.domain.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PublishSearchFilterRequest {
    private Integer issue;
    private Integer page;
    private String title;
    private Integer authorId;
    private Integer volume;
}
