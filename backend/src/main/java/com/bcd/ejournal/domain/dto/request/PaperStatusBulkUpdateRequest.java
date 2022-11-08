package com.bcd.ejournal.domain.dto.request;

import java.util.List;

import com.bcd.ejournal.domain.enums.PaperStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaperStatusBulkUpdateRequest {
    private List<Integer> paperIds;
    private PaperStatus status;
}
