package com.bcd.ejournal.service;

import java.util.List;

import com.bcd.ejournal.domain.dto.request.PaperSubmitRequest;
import com.bcd.ejournal.domain.dto.request.PaperUpdatePaperRequest;
import com.bcd.ejournal.domain.dto.response.PaperUpdatepaperRespone;
import com.bcd.ejournal.domain.entity.Paper;
import com.bcd.ejournal.domain.exception.PaperException;


;

public interface PaperService {
	void submitPaper(PaperSubmitRequest paperSubmitRequest) throws PaperException;
	
	PaperUpdatepaperRespone updateSubmitPaper(PaperUpdatePaperRequest req);
	
	List<Paper> listAll(String title);
	
	int deleteById(int Id) throws Exception;
	
	
}