package com.bcd.ejournal.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
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
    @NotBlank
    private Integer numOfRound;
    @NotBlank
    private Integer numOfReviewer;
}
