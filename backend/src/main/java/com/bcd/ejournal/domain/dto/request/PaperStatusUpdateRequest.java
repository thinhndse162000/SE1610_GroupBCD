package com.bcd.ejournal.domain.dto.request;

import com.bcd.ejournal.domain.enums.PaperStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaperStatusUpdateRequest {
    private PaperStatus status;
}
