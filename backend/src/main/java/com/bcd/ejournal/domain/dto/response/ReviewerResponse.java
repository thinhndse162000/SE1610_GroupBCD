package com.bcd.ejournal.domain.dto.response;

import java.util.List;

import com.bcd.ejournal.domain.entity.Field;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewerResponse {
    private Integer reviewerId;
    private String fullName;
    private List<Field> fields;
    private Boolean invitable;
}
