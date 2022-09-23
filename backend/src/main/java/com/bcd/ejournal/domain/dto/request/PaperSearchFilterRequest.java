package com.bcd.ejournal.domain.dto.request;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PaperSearchFilterRequest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int paperId ;
}
