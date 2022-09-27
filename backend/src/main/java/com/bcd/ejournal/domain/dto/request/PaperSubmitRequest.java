package com.bcd.ejournal.domain.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
public class PaperSubmitRequest {
    @NotBlank(message = "Title cannot be blank")
    private String title;
    @NotBlank(message = ("Summary cannot be blank"))
    private String summary;
    @NotNull(message = "PDF file cannot be blank")
    private MultipartFile file;
    @NotNull(message = "Journal cannot be blank")
    private Integer journalId;
    // TODO: exclude user email
    private List<String> authorEmails;
}
