package com.bcd.ejournal.domain.dto.request;

import java.util.List;

import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewerUpdateFieldRequest {
    @NotEmpty
    private List<Integer> fieldId;
}
