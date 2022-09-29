package com.bcd.ejournal.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class JournalCreateRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String introduction;
    @NotBlank
    private String organization;
    @NotBlank
    private String issn;
}
