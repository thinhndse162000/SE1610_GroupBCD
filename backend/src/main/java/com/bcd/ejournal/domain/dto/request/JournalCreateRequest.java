package com.bcd.ejournal.domain.dto.request;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @NotEmpty
    private List<Integer> fieldId;
    @NotBlank
    private Integer numberOfRound;
    @NotBlank
    private Integer numberOfReviewer;
}
