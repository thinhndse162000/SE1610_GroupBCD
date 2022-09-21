package com.bcd.ejournal.service;

import com.bcd.ejournal.domain.dto.request.PaperSubmitRequest;
import com.bcd.ejournal.domain.dto.request.PaperUpdatePaperRequest;
import com.bcd.ejournal.domain.dto.response.PaperUpdatepaperRespone;
import com.bcd.ejournal.domain.exception.PaperException;


;

public interface PaperService {
	void submitPaper(PaperSubmitRequest paperSubmitRequest) throws PaperException;
	
	PaperUpdatepaperRespone updateSubmitPaper(Integer Id, PaperUpdatePaperRequest req);
	PaperUpdatepaperRespone findById();
}