package com.bcd.ejournal.domain.dto.request;

import javax.validation.constraints.NotBlank;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class PaperSubmitRequest {
	@NotBlank(message = "Title Cannot be Blank")
	private String title;
	
	@NotBlank(message = ("Sumary Cannot be blank"))
	private String _abtract;
	
	private MultipartFile file;
	
	private int journalId;

}
