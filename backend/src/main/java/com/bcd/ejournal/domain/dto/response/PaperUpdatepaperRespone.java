package com.bcd.ejournal.domain.dto.response;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaperUpdatepaperRespone {
	private String title ;
	private String sumary ;
	private Timestamp submitTime ;
	private String linkPDF ;
	private int numberOfPage ;
	private int status ;
	private int journalId ;
}
