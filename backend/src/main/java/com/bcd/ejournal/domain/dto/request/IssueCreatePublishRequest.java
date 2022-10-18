package com.bcd.ejournal.domain.dto.request;

import com.bcd.ejournal.domain.enums.PublishAccessLevel;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IssueCreatePublishRequest {
    private Integer paperId;
    private PublishAccessLevel accessLevel;
}
