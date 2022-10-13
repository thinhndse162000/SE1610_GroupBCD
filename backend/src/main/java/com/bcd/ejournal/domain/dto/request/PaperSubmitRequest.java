package com.bcd.ejournal.domain.dto.request;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaperSubmitRequest {
    @NotBlank(message = "Title cannot be blank")
    private String title;
    @NotBlank(message = ("Summary cannot be blank"))
    private String summary;
    @NotNull(message = "PDF file cannot be blank")
    private MultipartFile file;
    @NotEmpty(message = "Fields must not be empty")
    private List<Integer> fieldId;
    @NotNull(message = "Journal cannot be blank")
    private Integer journalId;
}
