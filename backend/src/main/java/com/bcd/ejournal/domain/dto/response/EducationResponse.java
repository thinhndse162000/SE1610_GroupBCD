package com.bcd.ejournal.domain.dto.response;

import java.util.List;

import com.bcd.ejournal.domain.entity.Field;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EducationResponse {
    private String introduction;
    private String education;
    private String address;
    private boolean invitable;
    private List<Field> fields;
}
