package com.bcd.ejournal.domain.dto.request;


import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class PaperUpdateRequest {
    @NotBlank(message = "Title cannot be Blank")
    private String title;
    @NotBlank(message = "Summary cannot be blank")
    private String summary;
    @NotNull(message = "PDf file cannot be blank")
    private MultipartFile file;
}
