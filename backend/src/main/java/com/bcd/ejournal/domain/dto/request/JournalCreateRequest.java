package com.bcd.ejournal.domain.dto.request;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

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
    @NotBlank
    private String managerEmail;
    @NotEmpty
    private List<Integer> fieldId;
    @NotNull
    private Integer numberOfRound;
    @NotNull
    private Integer numberOfReviewer;
    @NotNull
    private String policy;
}
