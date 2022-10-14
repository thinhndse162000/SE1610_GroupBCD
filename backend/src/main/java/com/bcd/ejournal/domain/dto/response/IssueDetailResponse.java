package com.bcd.ejournal.domain.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IssueDetailResponse {
    // FIXME: duplicate issueResponse in issue and publishes
    // TODO: divide this
    private IssueResponse issue;
    private List<PublishResponse> publishes;
}
