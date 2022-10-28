package com.bcd.ejournal.domain.dto.request;


import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class PaperUpdateRequest {
    @NotBlank(message = "Title cannot be Blank")
    private String title;
    @NotBlank(message = "Summary cannot be blank")
    private String summary;
    private MultipartFile file;
}
