package com.bcd.ejournal.domain.dto.request;

import java.sql.Timestamp;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class PaperSubmitRequest {
		@NotBlank(message = "Title Cannot be Blank")
		private String title;
		@NotBlank(message = ("Sumary Cannot be blank"))
		private String sumary;
		@NotNull
		private Timestamp submitTime;
		@NotBlank(message = "Please attach file PDF")
		private String linkPDF;
		private int numberOfPage;
		private int status;
		private int journalId;
}
