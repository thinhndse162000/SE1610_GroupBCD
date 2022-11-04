package com.bcd.ejournal.domain.dto.request;

import java.sql.Date;
import java.util.List;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IssueCreateRequest {
    @NotBlank(message = "Start date must not be null")
    private Date startDate;
    @NotBlank(message = "End date must not be null")
    private Date endDate;
    @NotBlank(message = "Publish must not be null")
    private List<IssueCreatePublishRequest> publishes;
}
